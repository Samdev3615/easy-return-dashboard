# Easy Return Dashboard 📊

Tableau de bord de suivi du projet **Easy Return** - Une application de gestion de livraisons avec 3 applications (Client, Chauffeur, Admin).

## 🌟 Fonctionnalités

- 📈 **Suivi de progression** par phases et séquences
- ⏱️ **Statistiques de développement** (heures par session/module)
- 📅 **Timeline des sessions** avec détails des réalisations
- 🏗️ **Diagrammes d'architecture** du système
- 📊 **Graphiques interactifs** avec Recharts
- 🌍 **Multilingue** : Anglais, Français, Hébreu (avec support RTL)
- 🎨 **Design moderne** inspiré de Linear.app

## 🛠️ Technologies

- **Framework** : React 18 + TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS v3
- **Charts** : Recharts
- **Icons** : Lucide React
- **Routing** : React Router v7
- **i18n** : i18next + react-i18next

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

### Prévisualisation du build

```bash
npm run preview
```

## 📦 Déploiement GitHub Pages

Le projet est configuré pour se déployer automatiquement sur GitHub Pages à chaque push sur la branche `main`.

### Configuration initiale

1. **Créer un repository GitHub** et pusher le code :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/easy-return-dashboard.git
git push -u origin main
```

2. **Activer GitHub Pages** :
   - Aller dans Settings > Pages
   - Source : GitHub Actions

3. Le déploiement se fera automatiquement ! 🎉

### URL du site

Après déploiement : `https://VOTRE_USERNAME.github.io/easy-return-dashboard/`

## 📂 Structure du projet

```
easy-return-dashboard/
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Pages principales
│   ├── data/             # Données du projet (devlog.json)
│   ├── i18n/             # Traductions (en, fr, he)
│   ├── types/            # Types TypeScript
│   └── App.tsx           # Composant principal
├── public/               # Fichiers statiques
└── dist/                # Build de production
```

## 🌐 Langues supportées

- 🇬🇧 **English**
- 🇫🇷 **Français**
- 🇮🇱 **עברית** (Hebrew) avec support RTL

## 📝 Mise à jour des données

Pour ajouter une nouvelle session de développement, modifiez `src/data/devlog.json` :

```json
{
  "id": 43,
  "date": "2026-02-14",
  "title": "Nouvelle fonctionnalité",
  "sequences": ["S027"],
  "duration": 3,
  "highlights": ["s27_1", "s27_2", "s27_3"]
}
```

N'oubliez pas d'ajouter les traductions dans `src/i18n/locales/*.json` :

```json
"sessionHighlights": {
  "s27_1": "Description en anglais",
  "s27_2": "...",
  "s27_3": "..."
}
```

## 🎨 Personnalisation

Les couleurs du thème sont définies dans `tailwind.config.js` :

```js
colors: {
  primary: '#FF6B00',      // Orange
  secondary: '#1E3A8A',    // Bleu foncé
  success: '#10B981',      // Vert
  warning: '#F59E0B',      // Jaune
  error: '#EF4444',        // Rouge
  info: '#3B82F6',         // Bleu
}
```

## 📄 Licence

MIT

## 👨‍💻 Développé avec ❤️ pour Easy Return

---

Pour toute question ou suggestion, ouvrez une issue sur GitHub !
