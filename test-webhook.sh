#!/bin/bash

PAYLOAD='{"type":"contact.tag.added","data":{"contact":{"id":123,"email":"marianokopp@gmail.com"},"tag":{"name":"simply_carousel_pro"}}}'
SECRET="1291ff7200c06565a17766c5b9b7bf16f5130176ae2f8ce2dfb34bb6b6face93"
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')

echo "Payload: $PAYLOAD"
echo "Signature: $SIGNATURE"
echo ""
echo "Sending webhook..."

curl -v -X POST "http://localhost:3000/api/webhooks/systeme" \
  -H "Content-Type: application/json" \
  -H "x-systeme-signature: $SIGNATURE" \
  -d "$PAYLOAD"
