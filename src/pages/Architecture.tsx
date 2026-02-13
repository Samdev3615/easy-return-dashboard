import { useTranslation } from 'react-i18next';
import { Box, Database, Smartphone, Monitor } from 'lucide-react';

export default function Architecture() {
  const { t } = useTranslation();

  const features = [
    { key: 'authentication', titleKey: 'authentication', descKey: 'authDesc', color: 'bg-primary/10' },
    { key: 'gpsTracking', titleKey: 'gpsTracking', descKey: 'gpsDesc', color: 'bg-info/10' },
    { key: 'realtimeSync', titleKey: 'realtimeSync', descKey: 'realtimeSyncDesc', color: 'bg-success/10' },
    { key: 'pushNotifications', titleKey: 'pushNotifications', descKey: 'pushDesc', color: 'bg-warning/10' },
    { key: 'payments', titleKey: 'payments', descKey: 'paymentsDesc', color: 'bg-error/10' },
    { key: 'storage', titleKey: 'storage', descKey: 'storageDesc', color: 'bg-purple-100' },
  ];

  const clientFlowSteps = [
    'flowSignup',
    'flowCreateOrder',
    'flowTrackPackage',
    'flowPayment',
    'flowDelivery',
  ];

  const driverFlowSteps = [
    'flowLogin',
    'flowActivateGPS',
    'flowReceiveOrders',
    'flowNavigation',
    'flowConfirmDelivery',
  ];

  const adminFlowSteps = [
    'flowAdminLogin',
    'flowDashboardStats',
    'flowManageOrders',
    'flowManageUsers',
    'flowAnalytics',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Box className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">{t('architecture.title')}</h1>
        </div>
        <p className="text-gray-600">
          {t('architecture.subtitle')}
        </p>
      </div>

      {/* Vue d'ensemble */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('architecture.systemOverview')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-orange-100 rounded-xl">
            <Smartphone className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">{t('architecture.clientApp')}</h3>
            <p className="text-sm text-gray-600">React Native • iOS & Android</p>
            <p className="text-xs text-gray-500 mt-2">{t('architecture.clientAppDesc')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-info/10 to-blue-100 rounded-xl">
            <Smartphone className="w-12 h-12 text-info mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">{t('architecture.driverApp')}</h3>
            <p className="text-sm text-gray-600">React Native • iOS & Android</p>
            <p className="text-xs text-gray-500 mt-2">{t('architecture.driverAppDesc')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-success/10 to-green-100 rounded-xl">
            <Monitor className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">{t('architecture.adminDashboard')}</h3>
            <p className="text-sm text-gray-600">React • Web</p>
            <p className="text-xs text-gray-500 mt-2">{t('architecture.adminDashboardDesc')}</p>
          </div>
        </div>
      </div>

      {/* Backend */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('architecture.backendServices')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Database className="w-6 h-6 text-warning" />
              <h3 className="font-semibold text-gray-900">Firebase Firestore</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.firestoreDesc1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.firestoreDesc2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.firestoreDesc3')}</span>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Database className="w-6 h-6 text-error" />
              <h3 className="font-semibold text-gray-900">Realtime Database</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.realtimeDbDesc1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.realtimeDbDesc2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{t('architecture.realtimeDbDesc3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Flows */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('architecture.userFlows')}</h2>

        {/* Client Flow */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            {t('architecture.clientFlow')}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center space-x-3 min-w-max">
              {clientFlowSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`bg-white px-4 py-2 rounded-lg border-2 ${
                    index === clientFlowSteps.length - 1 ? 'border-success' : 'border-primary'
                  } shadow-sm`}>
                    {t(`architecture.${step}`)}
                  </div>
                  {index < clientFlowSteps.length - 1 && (
                    <span className="text-gray-400 mx-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Flow */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-info rounded-full mr-2"></span>
            {t('architecture.driverFlow')}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center space-x-3 min-w-max">
              {driverFlowSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`bg-white px-4 py-2 rounded-lg border-2 ${
                    index === driverFlowSteps.length - 1 ? 'border-success' : 'border-info'
                  } shadow-sm`}>
                    {t(`architecture.${step}`)}
                  </div>
                  {index < driverFlowSteps.length - 1 && (
                    <span className="text-gray-400 mx-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Flow */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
            {t('architecture.adminFlow')}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center space-x-3 min-w-max">
              {adminFlowSteps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="bg-white px-4 py-2 rounded-lg border-2 border-success shadow-sm">
                    {t(`architecture.${step}`)}
                  </div>
                  {index < adminFlowSteps.length - 1 && (
                    <span className="text-gray-400 mx-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features techniques */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('architecture.keyFeatures')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.key} className={`${feature.color} rounded-lg p-4`}>
              <h4 className="font-semibold text-gray-900 mb-1">
                {t(`architecture.${feature.titleKey}`)}
              </h4>
              <p className="text-sm text-gray-600">
                {t(`architecture.${feature.descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
