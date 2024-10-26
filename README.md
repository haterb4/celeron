# Celeron Framework Specification
Version: 1.0.0 (Draft)

## Vision
Celeron est un framework backend TypeScript moderne qui privilégie la simplicité, la flexibilité et la robustesse. Il vise à offrir une expérience développeur optimale tout en garantissant des performances de production excellentes.

## Principes Fondamentaux
1. **Simplicité**
   - APIs intuitives et cohérentes
   - Configuration minimale pour démarrer
   - Courbe d'apprentissage progressive
   - Documentation claire et exhaustive

2. **Flexibilité**
   - Architecture modulaire
   - Système de plugins extensible
   - Adaptable à différentes tailles de projets
   - Non-dogmatique dans les choix d'implémentation

3. **Robustesse**
   - Typage fort avec TypeScript
   - Gestion des erreurs prévisible
   - Tests automatisés facilités
   - Logging et monitoring intégrés

## Architecture

### Structure des Couches

#### 1. Domain Layer
- Entités métier pures
- Value Objects
- Interfaces des repositories
- Events du domaine
- Règles métier

#### 2. Application Layer
- Use Cases
- Command/Query Handlers
- DTOs
- Event Handlers
- Services applicatifs

#### 3. Infrastructure Layer
- Implémentations des repositories
- Adaptateurs externes
- Services techniques
- Gestion de la persistance

#### 4. Presentation Layer
- Controllers
- Routes API
- Middleware
- Validateurs
- Transformateurs

## Fonctionnalités Core

### 1. Routing & Middleware
- Routing basé sur les décorateurs
- Middleware pipeline configurable
- Gestion des paramètres de route typés
- Validation automatique des requêtes
- Support des versions d'API

### 2. Database & Persistence
- ORM/Query Builder abstrait
- Support multi-base de données
- Migrations automatisées
- Seeding de données
- Transactions typées

### 3. Sécurité
- Authentication modulaire
- Authorization RBAC/ABAC
- Protection CSRF
- Rate Limiting
- Validation des données

### 4. Caching
- Interface de cache unifiée
- Support multi-provider
- Cache tags
- Cache invalidation
- Cache strategies

### 5. Job Processing
- Queue management
- Tâches programmées
- Retry policies
- Priority queues
- Dead letter handling

## Developer Experience

### 1. CLI (Celeron CLI)
```bash
celeron new project
celeron generate controller
celeron generate service
celeron migrate
celeron test
```

### 2. Testing
- Test runners intégrés
- Assertions TypeScript
- Mocking helpers
- Factory patterns
- API testing utilities

### 3. Debugging
- Error stack traces améliorées
- Logging structuré
- Performance profiling
- Debug mode
- Development server

## Plugins & Extensions

### Core Plugins
1. **@celeron/orm**
   - Database abstraction
   - Query building
   - Migrations
   - Model relations

2. **@celeron/cache**
   - Redis support
   - Memcached support
   - Cache strategies
   - Distributed cache

3. **@celeron/queue**
   - Job processing
   - Multiple queue support
   - Priority handling
   - Error management

4. **@celeron/security**
   - Authentication
   - Authorization
   - Encryption
   - Security middleware

### Plugin API
- Hooks système
- Middleware injection
- Service providers
- Custom decorators
- Event listeners

## Performance

### Optimisations
- Lazy loading
- Connection pooling
- Query optimization
- Cache strategies
- Resource management

### Monitoring
- Metrics collection
- Performance tracing
- Health checks
- Resource utilization
- Error tracking

## Versioning & Compatibility

### Semantic Versioning
- MAJOR: Changements incompatibles
- MINOR: Nouvelles fonctionnalités
- PATCH: Bug fixes

### Release Cycle
- Alpha (développement)
- Beta (test)
- Release Candidate
- Stable
- LTS (Long Term Support)

## Prérequis Techniques
- Node.js ≥ 18
- TypeScript ≥ 4.8
- Support des ESM
- Support des Decorators

## Installation
```bash
npm install @celeron/core
npm install @celeron/cli -g
```

## Exemple Minimal
```typescript
import { Controller, Get, Celeron } from '@celeron/core';

@Controller('/hello')
class HelloController {
  @Get('/')
  async hello() {
    return { message: 'Hello Celeron!' };
  }
}

const app = new Celeron();
app.start();
```

## Documentation
- Guide de démarrage
- Tutoriels
- API Reference
- Cookbook
- Best Practices
- Migration Guides

## Support
- GitHub Issues
- Discord Community
- Stack Overflow Tag
- Security Advisories
- Newsletter

## Contribution
- Guidelines
- Code de conduite
- Process de PR
- Tests requis
- Documentation

## Roadmap 2024-2025
1. Q2 2024: Version Beta
2. Q3 2024: First Stable Release
3. Q4 2024: Enterprise Features
4. Q1 2025: LTS Release

## License
MIT License

# Structure des Projets Celeron

## 1. Structure du Framework (monorepo)
```
celeron/
├── packages/
│   ├── core/                     # Noyau du framework
│   │   ├── src/
│   │   │   ├── decorators/      # Tous les décorateurs
│   │   │   ├── di/             # Système d'injection de dépendances
│   │   │   ├── http/           # Gestion des requêtes HTTP
│   │   │   ├── routing/        # Système de routage
│   │   │   ├── validation/     # Validation des données
│   │   │   └── index.ts        # Point d'entrée principal
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── cli/                     # CLI du framework
│   │   ├── src/
│   │   │   ├── commands/       # Commandes CLI
│   │   │   ├── templates/      # Templates de génération
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── orm/                    # Module ORM
│   ├── cache/                  # Module de cache
│   ├── queue/                  # Module de queues
│   ├── security/               # Module de sécurité
│   ├── testing/                # Utilitaires de test
│   └── docs/                   # Documentation
│
├── examples/                   # Exemples d'applications
├── benchmarks/                # Tests de performance
└── package.json
```

## 2. Structure d'un Projet Utilisant Celeron

### Structure Minimale
```
mon-projet/
├── src/
│   ├── controllers/           # Controllers (optionnel)
│   ├── services/             # Services (optionnel)
│   ├── entities/             # Entités (optionnel)
│   ├── config/              # Configuration
│   │   └── app.config.ts    # Seul fichier requis
│   └── index.ts             # Point d'entrée
├── tests/
└── package.json
```

### Structure Complète Recommandée
```
mon-projet/
├── src/
│   ├── domain/              # Logique métier
│   │   ├── entities/        # Entités métier
│   │   ├── value-objects/   # Objets valeur
│   │   ├── events/          # Events domaine
│   │   └── interfaces/      # Interfaces du domaine
│   │
│   ├── application/         # Logique applicative
│   │   ├── use-cases/       # Cas d'utilisation
│   │   ├── services/        # Services applicatifs
│   │   ├── dtos/           # DTOs
│   │   └── interfaces/      # Interfaces applicatives
│   │
│   ├── infrastructure/      # Implémentations techniques
│   │   ├── repositories/    # Implémentations repository
│   │   ├── persistence/     # Configurations DB
│   │   ├── cache/          # Configurations cache
│   │   └── queue/          # Configurations queue
│   │
│   ├── interfaces/          # Couche présentation
│   │   ├── http/           # Controllers & routes
│   │   ├── console/        # Commandes console
│   │   └── websocket/      # Handlers websocket
│   │
│   ├── config/             # Configuration
│   │   ├── app.config.ts   # Config principale
│   │   ├── database.ts     # Config DB
│   │   ├── cache.ts        # Config cache
│   │   └── queue.ts        # Config queue
│   │
│   └── index.ts            # Point d'entrée
│
├── tests/                  # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── resources/              # Ressources statiques
│   ├── lang/              # Traductions
│   ├── views/             # Templates (si nécessaire)
│   └── assets/            # Autres assets
│
├── scripts/               # Scripts utilitaires
├── docs/                  # Documentation projet
├── logs/                  # Logs (gitignored)
├── dist/                  # Build (gitignored)
├── .env                   # Variables d'environnement
├── .env.example           # Example de .env
├── tsconfig.json          # Config TypeScript
├── package.json
└── README.md
```

## Conventions et Règles

### 1. Configuration Requise
Le seul fichier véritablement requis est `src/config/app.config.ts` qui doit exporter une configuration minimale :

```typescript
// app.config.ts
export default {
  name: 'Mon Application',
  port: process.env.PORT || 3000,
  // autres configurations optionnelles
}
```

### 2. Points de Flexibilité
- Toute la structure est flexible sauf `/src/config/app.config.ts`
- Les dossiers peuvent être renommés via la configuration
- L'architecture peut être aplatie ou plus profonde selon les besoins
- Possibilité d'ajouter des dossiers personnalisés
- Support des monorepos

### 3. Conventions de Nommage
- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Entities: `*.entity.ts`
- DTOs: `*.dto.ts`
- Interfaces: `*.interface.ts`
- Types: `*.type.ts`

### 4. Modules
Les modules sont optionnels et peuvent être organisés de deux façons :

```
# Approche 1 : Par feature
src/
└── modules/
    ├── users/
    │   ├── controllers/
    │   ├── services/
    │   └── entities/
    └── products/
        ├── controllers/
        ├── services/
        └── entities/

# Approche 2 : Par type
src/
├── controllers/
│   ├── users/
│   └── products/
├── services/
│   ├── users/
│   └── products/
└── entities/
    ├── users/
    └── products/
```

### 5. Tests
- Les tests suivent la même structure que le code source
- Nommage: `*.spec.ts` ou `*.test.ts`
- Support des fixtures et factories dans `/tests/fixtures`

### 6. Documentation
- Documentation API dans les contrôleurs (pour auto-génération)
- README.md à la racine de chaque module significatif
- Documentation technique dans `/docs`