import Layout from "../layout";
import 'tailwindcss/tailwind.css'; // Assurez-vous d'importer TailwindCSS

function Notification() {
  const notifications = [
    {
      title: "Synchronisation réussie",
      description: "La synchronisation avec Sage a été effectuée avec succès.",
      datetime: new Date().toLocaleString(),
      type: "success"
    },
    {
      title: "Synchronisation échouée",
      description: "Raison : Manque de sécurité.",
      datetime: new Date().toLocaleString(),
      type: "error"
    }
  ];

  return (
    <Layout>
    <div className="flex justify-center">
      <div className="w-1/2 mt-8 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Notifications</h2> {/* Titre ajouté ici */}
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg bg-gray-200 border-l-4 ${notification.type === 'success' ? 'border-green-400 text-green-700' : 'border-red-400 text-red-800'}`}
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-s">{notification.description}</p>
            <p className="text-xs text-gray-500">{notification.datetime}</p>
          </div>
        ))}
        {/* Exemples de notifications supplémentaires */}
        <div className="mb-4 p-4 rounded-lg bg-gray-200 border-l-4 border-red-400 text-red-800">
          <h3 className="text-lg font-semibold">Échec d'Import\Export</h3>
          <p className="text-s">L'entreprise existe déjà</p>
          <p className="text-xs text-gray-500">27-08-2024 10:15</p>
        </div>
        <div className="mb-4 p-4 rounded-lg bg-gray-200 border-l-4 border-yellow-400 text-yellow-800">
          <h3 className="text-lg font-semibold">Alerte</h3>
          <p className="text-s">Vérifiez les paramètres de configuration</p>
          <p className="text-xs text-gray-500">27-08-2024 11:00</p>
        </div>
       
        <div className="mb-4 p-4 rounded-lg bg-gray-200 border-l-4 border-green-400 text-green-700">
          <h3 className="text-lg font-semibold">Succès</h3>
          <p className="text-s">Données importées avec succès</p>
          <p className="text-xs text-gray-500">27-08-2024 12:30</p>
        </div>
      </div>
    </div>
  </Layout>
  

  );
}

export default Notification;
