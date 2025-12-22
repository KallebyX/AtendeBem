import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { parseWhatsAppWebhook, verifyWhatsAppWebhook } from "@/lib/whatsapp"

/**
 * GET - Webhook verification (Meta handshake)
 * Meta sends a GET request to verify the webhook URL
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  console.log("[WhatsApp Webhook] Verification request:", { mode, token, challenge })

  if (!mode || !token || !challenge) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  const verified = verifyWhatsAppWebhook(mode, token, challenge)

  if (verified) {
    console.log("[WhatsApp Webhook] ✅ Webhook verified successfully")
    return new NextResponse(challenge, { status: 200 })
  }

  console.log("[WhatsApp Webhook] ❌ Webhook verification failed")
  return NextResponse.json({ error: "Verification failed" }, { status: 403 })
}

/**
 * POST - Receive incoming messages from WhatsApp
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[WhatsApp Webhook] Received:", JSON.stringify(body, null, 2))

    // Parse incoming messages
    const messages = parseWhatsAppWebhook(body)

    if (messages.length === 0) {
      // No messages to process (might be status update)
      await handleStatusUpdates(body)
      return NextResponse.json({ success: true })
    }

    const sql = await getDb()

    for (const message of messages) {
      // Format phone number (remove 55 prefix for lookup)
      const phoneNumber = message.from.replace(/^55/, "")
      const fullPhone = message.from

      // Find or create conversation
      let conversation = await sql`
        SELECT c.*, u.id as owner_id
        FROM whatsapp_conversations c
        JOIN users u ON c.user_id = u.id
        WHERE c.phone_number = ${phoneNumber}
        OR c.phone_number = ${fullPhone}
        LIMIT 1
      `

      if (conversation.length === 0) {
        // Create new conversation without user_id (will be assigned when user responds)
        // For now, we'll skip messages from unknown numbers
        console.log(`[WhatsApp Webhook] Message from unknown number: ${phoneNumber}`)
        continue
      }

      const conv = conversation[0]
      const messageText = message.text?.body || `[${message.type}]`

      // Save incoming message
      await sql`
        INSERT INTO whatsapp_messages (
          user_id, conversation_id, message_id, direction,
          from_number, to_number, content_type, content_text,
          status, created_at
        ) VALUES (
          ${conv.user_id}, ${conv.id}, ${message.id}, 'inbound',
          ${fullPhone}, 'clinic', ${message.type}, ${messageText},
          'received', to_timestamp(${parseInt(message.timestamp)})
        )
        ON CONFLICT (message_id) DO NOTHING
      `

      // Update conversation
      await sql`
        UPDATE whatsapp_conversations
        SET
          last_message_at = NOW(),
          last_message_text = ${messageText},
          last_message_from = 'patient',
          unread_count = unread_count + 1,
          updated_at = NOW()
        WHERE id = ${conv.id}
      `

      console.log(`[WhatsApp Webhook] ✅ Message saved from ${phoneNumber}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[WhatsApp Webhook] Error:", error)
    // Always return 200 to acknowledge receipt (Meta requirement)
    return NextResponse.json({ success: true })
  }
}

/**
 * Handle message status updates (sent, delivered, read)
 */
async function handleStatusUpdates(body: any) {
  try {
    if (body.object !== "whatsapp_business_account") return

    const sql = await getDb()

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "messages") {
          const statuses = change.value.statuses || []

          for (const status of statuses) {
            const messageId = status.id
            const statusValue = status.status // sent, delivered, read, failed

            await sql`
              UPDATE whatsapp_messages
              SET status = ${statusValue}, status_updated_at = NOW()
              WHERE message_id = ${messageId}
            `

            console.log(`[WhatsApp Webhook] Status update: ${messageId} -> ${statusValue}`)
          }
        }
      }
    }
  } catch (error) {
    console.error("[WhatsApp Webhook] Status update error:", error)
  }
}
