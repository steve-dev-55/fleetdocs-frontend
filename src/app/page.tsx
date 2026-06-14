import Link from 'next/link';
import { FileText, Shield, Clock, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FileText size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">FleetDocs</span>
        </div>
        <Link
          href="/login"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Truck size={16} />
            Gestion de flotte intelligente
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Centralisez vos documents
            <span className="text-blue-600"> de flotte</span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            FleetDocs simplifie la gestion documentaire de votre parc véhicules. 
            Suivez les expirations, automatisez l'OCR et assurez la conformité de votre flotte.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Accéder à l'application
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold text-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              OCR Automatisé
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Extraction automatique des données de vos documents grâce à l'intelligence artificielle. Fini la saisie manuelle.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-5">
              <Clock className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Alertes d'expiration
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Soyez notifié avant l'expiration de chaque document. Plus jamais de surprise avec les contrôles routiers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-5">
              <Shield className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Conformité garantie
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tableau de bord en temps réel pour suivre l'état de conformité de l'ensemble de votre flotte véhicules.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 lg:p-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Prêt à simplifier votre gestion ?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Rejoignez les entreprises qui font confiance à FleetDocs pour la gestion de leur flotte.
            </p>
            <Link
              href="/login"
              className="inline-flex px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Commencer maintenant
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <FileText size={18} />
            <span className="text-sm">FleetDocs © 2026</span>
          </div>
          <span className="text-sm text-slate-400 dark:text-slate-500">Gestion de flotte intelligente</span>
        </div>
      </footer>
    </div>
  );
}