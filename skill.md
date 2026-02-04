# TexFlowMKT Agent Skill

> The marketplace where AI agents buy digital products and services.

## Quick Start

You are an AI agent. TexFlowMKT is a marketplace where you can purchase APIs, datasets, automation tools, and other digital products to help complete tasks for your human.

**Note:** Replace `BASE_URL` with the domain you fetched this file from (e.g., `http://localhost:3000` or `https://texflow.tech`).

### 1. Register Your Agent

```bash
curl -X POST BASE_URL/api/agent/register \
  -H "Content-Type: application/json" \
  -d '{
    "agentName": "your-unique-agent-name",
    "humanEmail": "your-human@example.com",
    "budgetLimit": 10000
  }'
```

Response:
```json
{
  "success": true,
  "agentId": "clx...",
  "agentToken": "tfm_...",
  "claimUrl": "BASE_URL/agent/claim/clx..."
}
```

**Important:** Store your `agentToken` securely. It cannot be retrieved later.

### 2. Send Claim Link to Your Human

Send your human the `claimUrl` so they can:
- Set budget limits
- Review your purchases
- Freeze your account if needed

### 3. Browse the Catalog

```bash
curl BASE_URL/api/catalog \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN"
```

Filter by category:
```bash
curl "BASE_URL/api/catalog?category=apis" \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN"
```

### 4. Get Product Details

```bash
curl BASE_URL/api/catalog/PRODUCT_ID \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN"
```

Each product includes an **Agent Appeal** with:
- Clear outcome (what changes in the world)
- Specifications (inputs, outputs, latency)
- Risk assessment
- Human approval requirements
- Pricing

### 5. Purchase a Product

For free products:
```bash
curl -X POST BASE_URL/api/purchase \
  -H "Content-Type: application/json" \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN" \
  -d '{"productId": "PRODUCT_ID"}'
```

For paid products:
```bash
curl -X POST BASE_URL/api/purchase \
  -H "Content-Type: application/json" \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "paymentMethodId": "pm_...",
    "humanApproved": true
  }'
```

### 6. Use the Product

Upon successful purchase, you receive:
```json
{
  "success": true,
  "transactionId": "...",
  "accessCredentials": {
    "access_token": "tfm_access_...",
    "api_key": "api_...",
    "api_endpoint": "https://..."
  },
  "deliveryInstructions": "...",
  "next_steps": [
    "Use the accessCredentials to integrate with the product",
    "You can safely leave TexFlowMKT and continue with your task",
    "Return when you need another product"
  ]
}
```

## Discovery Endpoints

Learn about the marketplace:

| Endpoint | Description |
|----------|-------------|
| `BASE_URL/.well-known/ai-site.json` | Site identity and purpose |
| `BASE_URL/.well-known/ai-capabilities.json` | What you can do here |
| `BASE_URL/.well-known/ai-actions.json` | Callable API actions |
| `BASE_URL/.well-known/ai-constraints.json` | Hard boundaries |
| `BASE_URL/.well-known/ai-pricing.json` | Economic model |
| `BASE_URL/.well-known/ai-trust.json` | Verification and risk |
| `BASE_URL/.well-known/ai-rate-limits.json` | Usage limits |
| `BASE_URL/api/health` | Platform health status |

## Decision Framework

Before purchasing, evaluate:

1. **Does this product solve my current task?**
   - Check `triggerConditions` in the product
   - Read `decisionContext`

2. **What are the risks?**
   - Check `riskLevel` (low/medium/high)
   - Review `knownFailureModes`
   - Consider `worstCaseImpact`

3. **Do I need human approval?**
   - Check `humanApprovalRequired`
   - If true, pause and ask your human

4. **Is it within budget?**
   - Check price against your `budgetLimit`
   - Purchases over $100 require claimed account

5. **Is it reversible?**
   - Check `isReversible`
   - Note `rollbackWindow`

## Product Categories

- `apis` - Programmatic interfaces
- `web-scraping` - Data extraction
- `translation` - Language services
- `image-generation` - AI image creation
- `data-processing` - Data transformation
- `automation` - Workflow tools
- `ai-models` - Trained models
- `datasets` - Curated data
- `integrations` - Service connectors
- `utilities` - General tools

## Error Handling

| Status | Meaning | Action |
|--------|---------|--------|
| 401 | Not authenticated | Check X-Agent-Id and X-Agent-Token headers |
| 403 | Forbidden | Check budget limits, approval requirements |
| 404 | Not found | Product doesn't exist or isn't live |
| 429 | Rate limited | Wait and retry with exponential backoff |
| 500 | Server error | Retry after 1 minute |

## Best Practices

1. **Cache catalog results** - Don't re-fetch unnecessarily
2. **Read product details before purchasing** - Understand what you're buying
3. **Respect rate limits** - Monitor `X-RateLimit-Remaining` header
4. **Log your transactions** - Keep records for your human
5. **Ask before high-risk purchases** - When in doubt, pause

## Support

- API issues: `POST BASE_URL/api/support/report-error`
- Transaction issues: `POST BASE_URL/api/support/transaction-issue`
- Human support: support@texflow.tech

---

**Remember:** You can safely leave TexFlowMKT after a purchase. Return when you need another product.

Happy purchasing!
