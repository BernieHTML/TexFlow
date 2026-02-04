# TexFlowMKT

> **The Future of Commerce. Humans Sell, Agents Buy.**

TexFlowMKT is a marketplace designed specifically for AI agents to discover, evaluate, and purchase digital products and services. Human merchants list products with structured "Agent Appeal" descriptions, and AI agents can autonomously browse, query, and purchase through a machine-first API.

## Features

### For Merchants (Humans)
- **AI-Powered Product Wizard**: Create comprehensive Agent Appeal descriptions through a guided wizard
- **15-Section Agent Appeal**: Every product is described with structured, machine-readable specifications
- **Dashboard**: Track views, purchases, and revenue
- **Instant Publishing**: Products go live immediately after creation

### For Agents (AI)
- **Machine-First Discovery**: `.well-known/` files describe site capabilities without scraping
- **Structured Catalog**: Browse products by category, type, price, and search terms
- **Full Agent Appeal Data**: Make informed decisions based on specs, not marketing
- **Instant Access**: Receive credentials immediately upon purchase
- **Human Oversight Controls**: Know when to pause and ask humans

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Payments**: Stripe Connect (5% platform fee)
- **AI**: OpenAI API (optional, for wizard assistance)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Stripe account for payments
- (Optional) OpenAI API key for AI-assisted wizard

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/texflowmkt.git
cd texflowmkt

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Generate Prisma client and create database
npm run db:generate
npm run db:push

# Seed demo data (optional)
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Stripe (Required for paid products)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# OpenAI (Optional - for AI-assisted wizard)
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="TexFlowMKT"
```

## API Reference

### Agent Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/agent/register` | POST | Register a new agent |
| `/api/catalog` | GET | Browse product catalog |
| `/api/catalog/:productId` | GET | Get product details |
| `/api/purchase` | POST | Purchase a product |
| `/api/agent/transactions` | GET | View transaction history |
| `/api/health` | GET | Check platform health |

### Authentication Headers

For authenticated endpoints, include:
```
X-Agent-Id: your_agent_id
X-Agent-Token: your_agent_token
```

### Example: Agent Registration

```bash
curl -X POST http://localhost:3000/api/agent/register \
  -H "Content-Type: application/json" \
  -d '{
    "agentName": "my-agent",
    "humanEmail": "owner@example.com",
    "budgetLimit": 10000
  }'
```

### Example: Browse Catalog

```bash
curl http://localhost:3000/api/catalog?category=apis \
  -H "X-Agent-Id: YOUR_AGENT_ID" \
  -H "X-Agent-Token: YOUR_TOKEN"
```

## Discovery Files

The `.well-known/` directory contains machine-readable site specifications:

| File | Purpose |
|------|---------|
| `ai-site.json` | Site identity and purpose |
| `ai-capabilities.json` | What agents can do here |
| `ai-actions.json` | Callable API actions |
| `ai-constraints.json` | Hard boundaries and rules |
| `ai-pricing.json` | Economic model |
| `ai-trust.json` | Verification and risk info |
| `ai-rate-limits.json` | Usage limits |
| `ai-contacts.json` | Escalation paths |
| `ai-version.json` | Versioning policy |
| `ai-humans.txt` | Human context document |

## Setting Up Stripe

### For Development (Test Mode)

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Dashboard
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### For Production

1. **Enable Stripe Connect** (for merchant payouts):
   - Go to Stripe Dashboard > Settings > Connect
   - Enable Express accounts
   
2. **Set up Webhooks**:
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe
   
   # Forward webhooks to local server
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
3. **Configure webhook secret**:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Payment Flow

1. Agent initiates purchase with `paymentMethodId`
2. Platform creates PaymentIntent with 5% application fee
3. 95% goes to seller's Stripe Connect account
4. 5% retained by platform

## Setting Up OpenAI (Optional)

The AI-powered wizard uses OpenAI to help merchants create better Agent Appeal descriptions:

1. Get API key from https://platform.openai.com
2. Add to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   ```

The wizard works without OpenAI using smart defaults, but AI assistance provides better suggestions.

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Demo data seeder
├── public/
│   ├── .well-known/       # Agent discovery files
│   └── skill.md           # Agent skill file
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── merchant/      # Merchant pages
│   │   ├── agent/         # Agent pages
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
```

## Demo Data

Run the seed script to populate demo products:

```bash
npm run db:seed
```

This creates:
- Demo merchant account: `demo@texflow.tech` / `demo1234`
- Three demo products (WebScraper Pro API, TranslateNow API, ImageGen Studio)
- Product categories

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
# Dockerfile example coming soon
```

### Self-Hosted

1. Build the application:
   ```bash
   npm run build
   ```

2. Set `DATABASE_URL` to your production database (PostgreSQL recommended)

3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Production Checklist

- [ ] Change `DATABASE_URL` to PostgreSQL
- [ ] Set strong `JWT_SECRET`
- [ ] Configure Stripe production keys
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS for your domain
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting at infrastructure level
- [ ] Set up database backups
- [ ] Review `.well-known/` files for production values

## Agent Appeal Schema

Every product includes a 15-section Agent Appeal:

1. **Product Identity** - Name, type, version, maintainer
2. **Clear Outcome** - What changes in the world
3. **Intended Agent Use** - When should agents consider this
4. **Human Oversight** - Approval requirements
5. **Specifications** - Inputs, outputs, latency, accuracy
6. **Success Metrics** - How to measure success
7. **Constraints** - Hard and soft limits
8. **Pricing** - Economic model
9. **Integration Surface** - How to access
10. **Trust & Risk** - Verification, SLAs, failure modes
11. **Reversibility** - Can actions be undone
12. **Alternatives** - Comparison with competitors
13. **Versioning** - Update and deprecation policies
14. **Human Summary** - Plain language description
15. **Agent Summary** - Compact machine-first recap

## Contributing

Contributions welcome! Please read our contributing guidelines.

## License

MIT License - see LICENSE file for details.

---

**TexFlowMKT** - The future of commerce. Humans sell, agents buy.
