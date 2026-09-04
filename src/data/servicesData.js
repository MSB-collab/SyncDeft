export const servicesData = [
  {
    slug: 'ai-engineering-automation',
    title: 'AI Engineering & Automation',
    icon: 'fas fa-robot',
    description: 'Custom AI models and workflow automation that cut manual work and give your team a permanent capacity boost.',
    overview: 'We design and build custom AI models, machine learning pipelines, and autonomous workflow automation that sync directly into your existing tool stack. From eliminating repetitive manual processes to deploying predictive models and intelligent, context-aware chatbot systems, we help U.S. businesses reduce operational costs, remove human error, and make faster, data-backed decisions without adding headcount.',
    benefits: [
      'Elimination of repetitive manual tasks through autonomous workflow pipelines synced across your tool stack.',
      'Custom-trained AI and machine learning models built around your specific data and business logic.',
      'Predictive analytics and anomaly detection that surface insights before problems become costly.',
      'Retrieval-Augmented Generation (RAG) systems that ground AI outputs in your own company documents.'
    ],
    technologies: ['Python', 'LangChain', 'OpenAI API', 'TensorFlow', 'PyTorch', 'n8n', 'Vector Databases', 'Hugging Face'],
    process: [
      'Operational Audit & AI Use-Case Evaluation',
      'Data Cleaning, Labelling & Pipeline Architecture',
      'Custom Model Training & Workflow Development',
      'Human-in-the-Loop Testing & Validation',
      'Deployment, API Wrapping & Continuous Optimization'
    ],
    faqs: [
      {
        question: 'What kind of tasks can you automate with AI workflows?',
        answer: 'Anything repetitive and rule-based across your operations — data entry, lead qualification, reporting, internal approvals, customer support triage, and more — using custom AI models and orchestrated pipelines.'
      },
      {
        question: 'Will this integrate with our existing tools or replace them?',
        answer: 'It works alongside them. We sync your existing tool stack via APIs and webhooks so automated workflows pass data between the tools you already use, rather than forcing a migration.'
      },
      {
        question: 'How do you prevent AI hallucinations or errors from breaking our operations?',
        answer: 'We implement Retrieval-Augmented Generation (RAG) pipelines that ground outputs in your own company documents, plus human-in-the-loop checkpoints for high-stakes decisions.'
      },
      {
        question: 'How do you ensure data privacy when using LLMs?',
        answer: 'We configure private API endpoints or host open-source models on your private cloud infrastructure, ensuring no sensitive data is used to train public models.'
      }
    ]
  },
  {
    slug: 'ai-engineered-marketing',
    title: 'AI-Engineered Marketing',
    icon: 'fas fa-bullhorn',
    description: 'We replace legacy marketing models and vanity metrics with data-driven revenue generation.',
    overview: 'Powered by rigorous data science, automated funnel tracking, and real-time budget optimization, we deploy highly predictive performance campaigns built to scale global market share. Every decision is grounded in measurable revenue impact, not impressions or vanity metrics.',
    benefits: [
      'Revenue-first campaign design in place of vanity metric tracking.',
      'Real-time budget optimization driven by predictive performance data.',
      'Automated funnel tracking across the entire customer journey.',
      'Predictive campaign models built to scale into new global markets.'
    ],
    technologies: ['Python', 'Google Ads API', 'Meta Ads API', 'BigQuery', 'Looker Studio', 'Segment', 'Machine Learning Models'],
    process: [
      'Funnel & Attribution Audit',
      'Data Pipeline & Automated Tracking Setup',
      'Predictive Model & Campaign Architecture Design',
      'Real-Time Budget Optimization Deployment',
      'Continuous Performance Analysis & Scaling'
    ],
    faqs: [
      {
        question: 'How is this different from a traditional marketing agency?',
        answer: 'We build data science-driven systems rather than manually managing campaigns. Budget allocation, funnel tracking, and performance predictions are automated and grounded in revenue data, not impressions or clicks.'
      },
      {
        question: 'What metrics do you actually optimize for?',
        answer: 'We optimize for measurable revenue outcomes — customer acquisition cost, lifetime value, and return on ad spend — rather than vanity metrics like impressions or follower counts.'
      },
      {
        question: 'Can this scale campaigns into new international markets?',
        answer: 'Yes, our predictive models are designed to identify and prioritize high-potential markets, allowing budget to scale into new regions based on real performance data.'
      },
      {
        question: 'How quickly does the automated budget optimization take effect?',
        answer: 'Once tracking and data pipelines are in place, budget optimization runs in real time, continuously reallocating spend toward the highest-performing channels and campaigns.'
      }
    ]
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    icon: 'fas fa-laptop-code',
    description: 'Production-grade software built to your exact business logic, engineered to scale from MVP to enterprise.',
    overview: 'We build highly targeted software that aligns precisely with your workflows and business logic, from enterprise systems and internal tools to specialized platform integrations like Meta app development. Every system is architected for production from day one, with full intellectual property ownership, clean and maintainable code, and seamless integration with your legacy systems, databases, and third-party APIs — so what you launch with is what you scale with.',
    benefits: [
      'Full intellectual property ownership of the codebase with zero licensing fees.',
      'Production-grade, scalable architecture built to hold up under real-world usage from day one.',
      'Elimination of technical debt through clean, well-documented, modular codebases.',
      'Seamless integration with legacy systems and third-party APIs, including Meta Graph API.'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Go', 'GraphQL', 'PostgreSQL', 'Docker'],
    process: [
      'Requirements Analysis & Technical Feasibility Scoping',
      'System Architecture & UI/UX Wireframing',
      'Agile Iterative Development Sprints',
      'Load Testing, Security Hardening & QA',
      'Production Deployment & Hypercare Support'
    ],
    faqs: [
      {
        question: 'Who owns the custom software code after development?',
        answer: 'You do. Upon project completion and final payment, full intellectual property rights and all source code files are transferred completely to your organization.'
      },
      {
        question: 'How do you handle future updates and scalability?',
        answer: 'We design all custom systems using modular architecture and offer ongoing support contracts to build new features as your user base expands.'
      },
      {
        question: 'What is your typical development methodology?',
        answer: 'We follow Agile Scrum, breaking work into 2-week sprints with demo sessions at the end of each sprint so you can track progress and give feedback in real time.'
      },
      {
        question: 'Can you integrate our legacy systems or Meta platform tools with new software?',
        answer: 'Yes. We design custom API layers and middleware for legacy integrations, and build against the Meta Graph API for business tooling, messaging, and platform-compliant app review submissions.'
      }
    ]
  },
  {
    slug: 'staff-augmentation',
    title: 'Staff Augmentation & Dedicated Teams',
    icon: 'fas fa-users-cog',
    description: 'Scale your engineering team fast with dedicated developers who plug directly into your existing workflow.',
    overview: 'We provide dedicated software engineers, embedded directly into your team and processes, so you can scale delivery capacity without the overhead of a full hiring cycle. Every developer is vetted for both technical skill and communication, works your hours with real-time overlap, and reports through your existing project management tools from day one.',
    benefits: [
      'Faster time-to-hire than traditional recruiting, with vetted developers onboarded in days, not months.',
      'Significant cost savings compared to hiring full-time U.S.-based engineers, with no benefits or payroll overhead.',
      'Flexible scaling up or down based on project load, without long-term employment commitments.',
      'Direct integration into your Slack, Jira, and existing engineering workflows for zero onboarding friction.'
    ],
    technologies: ['React', 'Node.js', 'Python', 'Java', '.NET', 'AWS', 'Jira', 'Slack'],
    process: [
      'Role & Skill Requirement Scoping',
      'Candidate Shortlisting & Technical Vetting',
      'Client Interview & Team Fit Selection',
      'Onboarding into Existing Tools & Workflows',
      'Ongoing Performance Reviews & Flexible Scaling'
    ],
    faqs: [
      {
        question: 'How is staff augmentation different from outsourcing a full project?',
        answer: 'You retain full control over priorities, code review, and sprint planning. The developer works as an extension of your in-house team rather than delivering a fixed external scope.'
      },
      {
        question: 'What time zone overlap can we expect?',
        answer: 'We structure schedules to guarantee real-time overlap with U.S. business hours, typically 4-6 hours of daily overlap depending on your coast.'
      },
      {
        question: 'How do you vet developers before placement?',
        answer: 'Every candidate goes through technical assessments, live coding rounds, and communication screening before being presented to you.'
      },
      {
        question: 'Can we reassign a developer to a different project later?',
        answer: 'Yes, developers can be reassigned or scaled across projects as your roadmap shifts, with no re-hiring process required.'
      }
    ]
  },
  {
    slug: 'mvp-development',
    title: 'MVP Development for Startups',
    icon: 'fas fa-rocket',
    description: 'Launch a fundable, testable product in weeks, not months, with a fixed scope built for speed.',
    overview: 'We help early-stage founders turn an idea into a working product fast. Using a fixed-scope, fixed-timeline model, we prioritize the core features investors and early users actually need to validate, cutting the bloat that slows most MVP builds down. You get a functional, demo-ready product built on architecture that doesn’t need to be rebuilt once you raise your next round.',
    benefits: [
      'Fixed-price, fixed-timeline builds designed around startup runway and fundraising deadlines.',
      'Lean feature prioritization focused on what actually validates your core hypothesis.',
      'Production-ready codebase from day one, avoiding the throwaway-prototype trap.',
      'Direct founder access throughout the build instead of layers of account management.'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Supabase', 'Firebase', 'Stripe API', 'PostgreSQL', 'Vercel'],
    process: [
      'Founder Discovery & Core Feature Prioritization',
      'Rapid Wireframing & Technical Architecture',
      'Sprint-Based Build (2-4 Week Cycles)',
      'User Testing & Investor-Ready Demo Prep',
      'Launch Support & Post-MVP Roadmap Planning'
    ],
    faqs: [
      {
        question: 'How long does a typical MVP take?',
        answer: 'Most MVPs launch in 6 to 10 weeks depending on scope, with weekly builds you can test throughout.'
      },
      {
        question: 'Will the MVP code be reusable once we raise funding?',
        answer: 'Yes, we build on production-grade architecture from the start, so your seed-stage codebase becomes the foundation for your Series A product rather than a throwaway.'
      },
      {
        question: 'What if our scope changes mid-build?',
        answer: 'We lock an initial core scope to hit your timeline, then run any additions as clearly priced add-ons so your budget and deadline stay protected.'
      },
      {
        question: 'Do you help with technical due diligence for fundraising?',
        answer: 'Yes, we can prepare technical documentation and architecture overviews investors typically request during diligence.'
      }
    ]
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: 'fas fa-globe',
    description: 'High-performance, responsive websites and enterprise web applications that engage users and drive conversions.',
    overview: 'We build fast, secure, and modern web applications leveraging modern standards. From public-facing corporate sites to complex internal client portals and SaaS products, our frontend and backend engineers implement responsive layouts optimized for user experience and search index ranking.',
    benefits: [
      'Responsive design ensuring flawless operation across desktops, tablets, and mobile screens.',
      'Optimized performance with fast load times and high scores on web vitals.',
      'Search engine friendly structures and semantic markup.',
      'Secure, state-of-the-art authentication and database configurations.'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'HTML5 & CSS3', 'MongoDB'],
    process: [
      'Creative Design & Information Architecture',
      'Responsive Frontend Slicing & Markup Coding',
      'Backend REST API Integration',
      'Performance Optimization & Cross-Browser Validation',
      'Secure Hosting Setup & Launch'
    ],
    faqs: [
      {
        question: 'Will my website work perfectly on mobile phones?',
        answer: 'Absolutely. Responsive design is a core standard of our development workflow. Your web application will automatically adapt to any screen size and device resolution.'
      },
      {
        question: 'Do you implement SEO best practices during development?',
        answer: 'Yes, we optimize site assets, enforce semantic HTML structure, manage meta information, and structure code execution to ensure search engine indexers can crawl and index your site easily.'
      },
      {
        question: 'What technologies do you recommend for enterprise web applications?',
        answer: 'We primarily recommend React.js or Next.js for highly interactive frontends, coupled with Node.js or Python backend APIs and robust databases like PostgreSQL or MongoDB, depending on data relational needs.'
      },
      {
        question: 'Do you offer website hosting and post-launch maintenance?',
        answer: 'Yes, we set up secure cloud hosting environments (on AWS, Azure, or GCP) with automated CI/CD pipelines, and provide post-launch maintenance plans covering security updates, bug fixes, and performance tuning.'
      }
    ]
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    icon: 'fas fa-mobile-alt',
    description: 'Native and cross-platform mobile apps for iOS and Android built for optimal user engagement.',
    overview: 'We engineer intuitive, high-performance mobile applications that keep your brand in your customers’ pockets. Using native and modern cross-platform technologies, we design smooth interactive interfaces, integrate device features (GPS, camera, notifications), and guide you through App Store and Google Play deployments.',
    benefits: [
      'Single codebase solutions that reduce development and maintenance costs.',
      'Native-like rendering performance and fluid scrolling animations.',
      'Direct integration with phone features (biometrics, push notifications, offline storage).',
      'End-to-end management of App Store (iOS) and Google Play (Android) submissions.'
    ],
    technologies: ['Flutter', 'React Native', 'Android', 'iOS', 'Firebase', 'GraphQL', 'SQLite'],
    process: [
      'User Journey Mapping & Interactive Prototyping',
      'Cross-Platform Code Engineering',
      'API Integration & Offline Sync Setup',
      'Multi-Device Testing & App Store Preparation',
      'App Store Submission & App Store Optimization (ASO)'
    ],
    faqs: [
      {
        question: 'Should we build a hybrid app or separate native apps?',
        answer: 'For most companies, cross-platform frameworks like React Native or Flutter are recommended. They allow sharing over 90% of the codebase between iOS and Android, saving substantial time and cost while maintaining high performance.'
      },
      {
        question: 'How do push notifications work in your mobile apps?',
        answer: 'We integrate cloud messaging services like Firebase Cloud Messaging (FCM) or Apple Push Notification service (APNs) so your administrators can send targeted alerts to users.'
      },
      {
        question: 'Can the app function offline when there is no internet connection?',
        answer: 'Yes, we can implement local caching and offline data storage solutions (like SQLite or Realm). The app will sync local changes with the central database once a connection is re-established.'
      },
      {
        question: 'Do you assist with publishing apps to the Apple App Store and Google Play Store?',
        answer: 'Yes, we handle the entire submission process, including metadata configuration, compliance checks, screenshots, and addressing any app store review feedback to ensure a successful launch.'
      }
    ]
  },
  {
    slug: 'devops-cicd',
    title: 'DevOps & CI/CD Engineering',
    icon: 'fas fa-infinity',
    description: 'Automated deployment pipelines and infrastructure that let your team ship faster with fewer production incidents.',
    overview: 'We build and manage the automation layer between your code and production. From CI/CD pipelines and infrastructure as code to monitoring and incident response, we remove manual deployment steps and reduce release risk, so your engineering team spends time building instead of babysitting deployments.',
    benefits: [
      'Automated CI/CD pipelines that cut deployment time from hours to minutes.',
      'Infrastructure as Code setups that make environments reproducible and auditable.',
      'Proactive monitoring and alerting that catch issues before customers do.',
      'Reduced production incidents through automated testing gates and rollback procedures.'
    ],
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'AWS', 'Prometheus', 'Grafana'],
    process: [
      'Current Deployment Process Audit',
      'CI/CD Pipeline Design & Build',
      'Infrastructure as Code Implementation',
      'Monitoring, Logging & Alerting Setup',
      'Team Handoff & Documentation'
    ],
    faqs: [
      {
        question: 'How is this different from your Cloud Solutions service?',
        answer: 'Cloud Solutions covers migration and infrastructure architecture. DevOps focuses on the day-to-day automation layer, deployment pipelines, and release processes that run on top of that infrastructure.'
      },
      {
        question: 'Will this work with our existing GitHub or GitLab setup?',
        answer: 'Yes, we build pipelines directly into your existing repositories and version control, no migration required.'
      },
      {
        question: 'Can you set this up without disrupting current releases?',
        answer: 'Yes, we roll out pipelines in parallel to your existing process and cut over once fully tested.'
      },
      {
        question: 'Do you provide ongoing DevOps support after setup?',
        answer: 'Yes, we offer monitoring and pipeline maintenance retainers for teams that don’t have a dedicated DevOps hire yet.'
      }
    ]
  },
  {
    slug: 'qa-test-automation',
    title: 'QA & Test Automation',
    icon: 'fas fa-check-double',
    description: 'Automated testing frameworks that catch bugs before your customers do, without slowing down releases.',
    overview: 'We build automated testing suites covering unit, integration, and end-to-end testing, integrated directly into your CI/CD pipeline. Instead of manual QA becoming a release bottleneck, your team gets fast, repeatable test coverage that catches regressions before they hit production.',
    benefits: [
      'Automated regression testing that runs on every commit, catching bugs before deployment.',
      'Reduced manual QA overhead through repeatable, maintainable test suites.',
      'Faster release cycles with confidence, since testing no longer gates every deploy manually.',
      'Cross-browser and cross-device testing coverage for web and mobile products.'
    ],
    technologies: ['Cypress', 'Playwright', 'Selenium', 'Jest', 'PyTest', 'Postman', 'BrowserStack', 'GitHub Actions'],
    process: [
      'Test Coverage Gap Analysis',
      'Test Strategy & Framework Selection',
      'Automated Test Suite Development',
      'CI/CD Pipeline Integration',
      'Ongoing Maintenance & Coverage Expansion'
    ],
    faqs: [
      {
        question: 'Do we need existing automated tests to start?',
        answer: 'No, we can build a test suite from scratch or extend whatever partial coverage you already have.'
      },
      {
        question: 'What’s the difference between unit, integration, and end-to-end testing?',
        answer: 'Unit tests check individual functions in isolation, integration tests check how components work together, and end-to-end tests simulate real user flows across the full application.'
      },
      {
        question: 'Will this slow down our release velocity?',
        answer: 'No, automated tests run in your pipeline in parallel with other checks, adding confidence without adding meaningful time to your release process.'
      },
      {
        question: 'Can you test our mobile app as well as our web app?',
        answer: 'Yes, we cover both, including cross-device and cross-browser test coverage.'
      }
    ]
  },
  {
    slug: 'api-development-integration',
    title: 'API Development & Systems Integration',
    icon: 'fas fa-plug',
    description: 'Custom APIs and third-party integrations that connect your tools and unlock new revenue channels.',
    overview: 'We design, build, and document custom REST and GraphQL APIs, and connect your systems to the third-party platforms your business depends on. Whether you need to expose your product to partners, sync data across a fragmented tool stack, or integrate payment, CRM, and communication platforms, we handle the architecture and the edge cases.',
    benefits: [
      'Well-documented, versioned APIs that partners and internal teams can build against confidently.',
      'Seamless data sync across CRMs, payment processors, and internal tools.',
      'Secure authentication and rate-limiting architecture built to handle production traffic.',
      'Reduced manual data entry through automated, real-time system-to-system sync.'
    ],
    technologies: ['Node.js', 'Python', 'GraphQL', 'REST', 'Stripe API', 'Twilio', 'Salesforce API', 'Webhooks'],
    process: [
      'Integration Requirements & Data Mapping',
      'API Architecture & Authentication Design',
      'Build & Third-Party Platform Connection',
      'Load Testing & Error-Handling Validation',
      'Documentation & Developer Handoff'
    ],
    faqs: [
      {
        question: 'Can you integrate with our existing CRM and payment systems?',
        answer: 'Yes, we regularly integrate platforms like Salesforce, HubSpot, Stripe, and Twilio into custom applications and internal tools.'
      },
      {
        question: 'Will we get documentation for the API you build?',
        answer: 'Yes, every API ships with versioned documentation so your internal team or external partners can build against it without needing us involved.'
      },
      {
        question: 'How do you handle API security?',
        answer: 'We implement OAuth or token-based authentication, rate limiting, and encrypted data transmission as standard on every build.'
      },
      {
        question: 'What happens if a third-party API we depend on changes?',
        answer: 'We build with abstraction layers where possible so third-party changes require updates in one place, not a full rebuild.'
      }
    ]
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    icon: 'fas fa-layer-group',
    description: 'End-to-end SaaS builds covering multi-tenant architecture, billing, and everything needed to launch and scale a subscription product.',
    overview: 'We build SaaS products from the ground up, covering multi-tenant architecture, subscription billing, user permissions, and the operational tooling founders need to run a subscription business. Whether you’re launching a new product or rebuilding an existing one on more scalable foundations, we architect for the specific complexity SaaS products carry that standard web apps don’t.',
    benefits: [
      'Multi-tenant architecture built to isolate customer data securely at scale.',
      'Subscription billing, metering, and plan management integrated from day one.',
      'Role-based access control and admin tooling built for B2B customer needs.',
      'Infrastructure designed to handle usage spikes without a full re-architecture later.'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe Billing', 'Redis', 'AWS', 'Docker'],
    process: [
      'Product & Pricing Model Discovery',
      'Multi-Tenant Architecture Design',
      'Core Build: Auth, Billing & Permissions',
      'Feature Development Sprints',
      'Launch, Monitoring & Scaling Support'
    ],
    faqs: [
      {
        question: 'Do you handle subscription billing and plan changes?',
        answer: 'Yes, we integrate billing platforms like Stripe to handle subscriptions, upgrades, downgrades, and usage-based metering.'
      },
      {
        question: 'What is multi-tenant architecture and do we need it?',
        answer: 'It’s an architecture that securely isolates each customer’s data on shared infrastructure. Most B2B SaaS products need it; we’ll confirm based on your customer and compliance requirements.'
      },
      {
        question: 'Can you rebuild our existing SaaS product instead of a fresh build?',
        answer: 'Yes, we regularly re-architect existing products that have outgrown their original codebase, migrating data and features incrementally to avoid downtime.'
      },
      {
        question: 'How do you handle scaling as our user base grows?',
        answer: 'We design infrastructure with horizontal scaling in mind from the start, so growth in usage doesn’t require an emergency rebuild.'
      }
    ]
  },
  {
    slug: 'ecommerce-development',
    title: 'E-commerce Development',
    icon: 'fas fa-shopping-cart',
    description: 'Custom and platform-based online stores built to convert, from Shopify builds to fully custom checkout experiences.',
    overview: 'We build and customize e-commerce storefronts on platforms like Shopify, as well as fully custom checkout and product experiences when off-the-shelf platforms hit their limits. From product catalog architecture to payment processing and inventory sync, we build stores designed around conversion, not just aesthetics.',
    benefits: [
      'Platform builds (Shopify, WooCommerce) or fully custom storefronts, depending on your scale and flexibility needs.',
      'Conversion-focused checkout flows that reduce cart abandonment.',
      'Inventory and order management synced across your sales channels.',
      'Custom app and theme development for stores that outgrow standard templates.'
    ],
    technologies: ['Shopify', 'Shopify Liquid', 'WooCommerce', 'Next.js', 'Stripe API', 'WordPress', 'REST APIs'],
    process: [
      'Store Requirements & Platform Selection',
      'Product Catalog & Checkout Flow Design',
      'Theme/Storefront Development & Payment Integration',
      'Inventory & Sales Channel Sync Setup',
      'Launch & Post-Launch Conversion Optimization'
    ],
    faqs: [
      {
        question: 'Should we use Shopify or a fully custom build?',
        answer: 'Shopify covers most stores well and launches faster. A custom build makes sense once you need functionality or performance the platform can’t support.'
      },
      {
        question: 'Can you migrate our existing store to a new platform?',
        answer: 'Yes, we handle product, customer, and order data migration with minimal downtime during the switch.'
      },
      {
        question: 'Do you build custom Shopify apps?',
        answer: 'Yes, when standard apps don’t cover a specific workflow, we build custom Shopify apps against the Shopify Admin and Storefront APIs.'
      },
      {
        question: 'Can the store integrate with our existing inventory or fulfillment system?',
        answer: 'Yes, we build integrations to sync inventory and orders with third-party fulfillment and warehouse systems.'
      }
    ]
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    icon: 'fas fa-cloud',
    description: 'Secure, scalable cloud migrations, infrastructure management, and serverless architecture optimization.',
    overview: 'Accelerate your digital transformation by moving infrastructure to the cloud. We design resilient, cost-efficient cloud architectures, perform secure migrations, set up CI/CD pipelines, and configure auto-scaling systems to guarantee 99.9% uptime for your digital operations.',
    benefits: [
      'Substantial reduction in local hardware capital expenditures.',
      'High-availability hosting with automated server recovery and failover setups.',
      'Elastic resource scaling to handle sudden traffic peaks without lag.',
      'Compliance with modern data storage and security regulations.'
    ],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'Terraform'],
    process: [
      'Infrastructure Audit & Cloud Readiness Assessment',
      'Cloud Architecture Design & Cost Estimation',
      'Secure Data Migration & Network Setup',
      'Infrastructure as Code (IaC) Deployment',
      '24/7 Cloud Performance Monitoring Setup'
    ],
    faqs: [
      {
        question: 'How do you guarantee the security of our data in the cloud?',
        answer: 'We configure virtual private clouds (VPCs), enforce strict IAM access control rights, encrypt data at rest and in transit, and execute automated backups.'
      },
      {
        question: 'Can you help us migrate our on-premise servers to AWS?',
        answer: 'Yes, we specialize in lift-and-shift migrations as well as cloud-native re-architecting, minimizing downtime during database transfers.'
      },
      {
        question: 'How do you optimize cloud hosting costs?',
        answer: 'We implement automated scaling rules to shut down unused dev environments, run database profiling, and select reserved/spot instances to significantly reduce your monthly cloud bill.'
      },
      {
        question: 'What is Infrastructure as Code (IaC)?',
        answer: 'We use tools like Terraform to define your entire cloud infrastructure in code files. This enables repeatable, audited, and secure deployments across environments without manual setup errors.'
      }
    ]
  },
  {
    slug: 'software-maintenance-support',
    title: 'Software Maintenance & Support',
    icon: 'fas fa-life-ring',
    description: 'Ongoing support, bug fixes, and legacy modernization to keep your software running without surprises.',
    overview: 'We take over maintenance for existing software, whether we built it or not, handling bug fixes, security patching, dependency updates, and performance monitoring under a predictable support retainer. For older systems carrying technical debt, we also run phased modernization to bring legacy code up to current standards without a risky full rebuild.',
    benefits: [
      'Predictable monthly retainer instead of unplanned emergency development costs.',
      'Proactive security patching and dependency updates before they become vulnerabilities.',
      'Phased legacy modernization that avoids high-risk full rewrites.',
      'Direct access to engineers who know your codebase, not a new team each time.'
    ],
    technologies: ['Git', 'Docker', 'CI/CD Pipelines', 'Monitoring & Logging Tools', 'Stack-Matched to Your Codebase'],
    process: [
      'Codebase Audit & Technical Debt Assessment',
      'Support SLA & Retainer Scoping',
      'Ongoing Bug Fixes & Security Patching',
      'Performance Monitoring & Reporting',
      'Phased Modernization Roadmap (if needed)'
    ],
    faqs: [
      {
        question: 'Can you take over a codebase your team didn’t originally build?',
        answer: 'Yes, we regularly onboard onto existing codebases we didn’t build, starting with a technical audit before taking on support.'
      },
      {
        question: 'What’s included in a maintenance retainer?',
        answer: 'Typically bug fixes, security patching, dependency updates, and a set number of monthly support hours, scoped to your specific stack and needs.'
      },
      {
        question: 'How do you handle urgent production issues?',
        answer: 'Retainer clients get priority response times for critical issues, with SLAs defined upfront based on severity.'
      },
      {
        question: 'Is modernizing a legacy system cheaper than rebuilding from scratch?',
        answer: 'Usually yes. We assess case by case, but phased modernization typically costs less and carries far less risk than a full rebuild.'
      }
    ]
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: 'fas fa-palette',
    description: 'User-centered design systems and interactive wireframes built to optimize customer satisfaction and engagement.',
    overview: 'Design is not just how it looks, but how it works. Our UI/UX designers create intuitive, visually stunning layouts and build complete design systems. Through comprehensive user testing and low-fidelity prototyping, we verify that layouts guide visitors to conversions effortlessly.',
    benefits: [
      'Increased conversion rates through friction-free user journeys.',
      'Consistent branding across mobile, web, and internal applications.',
      'Low-fidelity wireframes that confirm workflows before coding begins.',
      'Improved digital accessibility (WCAG compliance) for inclusive usage.'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Illustrator', 'CSS Grid & Flexbox', 'Storybook'],
    process: [
      'User Research, Persona Definition & Site Map Setup',
      'Low-Fidelity Wireframes & Clickable Mockups',
      'High-Fidelity Visual Design & Interactive Prototypes',
      'Usability Testing, Heatmap Audits & Iterative Improvements',
      'Hand-off to Engineers with Complete Design Systems'
    ],
    faqs: [
      {
        question: 'What is the difference between UI and UX design?',
        answer: 'UX (User Experience) focuses on the logical structure, flow, and usability of the application. UI (User Interface) defines the visual elements, typography, color palettes, and overall aesthetics of the pages.'
      },
      {
        question: 'Do we get interactive prototypes to click through before development?',
        answer: 'Yes, we build clickable, interactive Figma prototypes that allow you to simulate navigation flows and actions before writing any frontend code.'
      },
      {
        question: 'How do you handle design hand-off to the development team?',
        answer: 'We provide developers with comprehensive Figma design systems including components, auto-layouts, spacing guides, and typography styles to ensure pixel-perfect conversion.'
      },
      {
        question: 'Do you perform user testing during the design phase?',
        answer: 'Yes, we conduct moderated and unmoderated usability tests with interactive prototypes on representative users to identify navigation bottlenecks before coding.'
      }
    ]
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    icon: 'fas fa-comments',
    description: 'Strategic technology advisory services to align your IT investments with overall business strategy.',
    overview: 'Navigate complex technology decisions with confidence. Our senior architects and IT consultants evaluate your software stacks, identify system bottlenecks, provide vendor recommendations, and devise strategic tech roadmaps that maximize returns on your technology expenditures.',
    benefits: [
      'Objective, vendor-neutral technology advice and system audits.',
      'Identification of operational cost leaks and licensing overheads.',
      'De-risked migration and software implementation plans.',
      'Short-term and long-term technical roadmap development.'
    ],
    technologies: ['Enterprise Architecture', 'Agile/Scrum Roadmap', 'IT Audit Toolsets', 'Cost Optimization Metrics', 'Jira', 'Confluence'],
    process: [
      'Current Tech Stack Assessment & Operational Audit',
      'Stakeholder Interviews & Business Alignment Auditing',
      'Gap Analysis & Infrastructure Recommendation Report',
      'Strategic IT Roadmap & Cost Analysis Formulation',
      'Implementation Oversight & Transition Management'
    ],
    faqs: [
      {
        question: 'Can you help us evaluate third-party software vendor proposals?',
        answer: 'Yes, we run comparative audits assessing technology viability, scalability potential, API open integration limits, and total cost of ownership (TCO).'
      },
      {
        question: 'How long does a standard IT strategy audit take?',
        answer: 'A comprehensive evaluation typically takes 2 to 4 weeks depending on database sizes, internal documentation, and stack complexity.'
      },
      {
        question: 'Do you provide virtual CTO (vCTO) services?',
        answer: 'Yes, we offer ongoing vCTO services, attending strategic executive meetings, planning tech roadmaps, and advising on technical hires for growing companies.'
      },
      {
        question: 'How do you approach legacy system modernization?',
        answer: 'We conduct a thorough risk-benefit analysis, then devise a phased modernization roadmap — usually strangling legacy components one by one to avoid high-risk migrations.'
      }
    ]
  }
];
