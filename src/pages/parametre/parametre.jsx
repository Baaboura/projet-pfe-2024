import Layout from "../layout";
import 'tailwindcss/tailwind.css';

function Parametre() {
  return (
    <Layout>
      {/* Conteneur principal avec un arrière-plan gris et centré */}
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-200">
      {/* Conteneur des paramètres */}
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Paramètres</h2>
          
          <div className="space-y-6">
            {/* Option : connecter au ERP */}
            <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 ">
              <div className="flex items-center justify-between">
                <label htmlFor="database" className="text-lg text-gray-600">Connecter au ERP</label>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  Configurer
                </button>
              </div>
              <div className="flex items-center mt-2 text-gray-500">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <p>Vous êtes actuellement connecté à Sage ERP</p>
              </div>
            </div>


            {/* Option 2: Base de Données */}
            <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 ">
              <div className="flex items-center justify-between">
                <label htmlFor="database" className="text-lg text-gray-600">Base de Données</label>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  Configurer
                </button>
              </div>
              <div className="flex items-center mt-2 text-gray-500">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <p>Vous êtes actuellement connecté au serveur de base de données.</p>
              </div>
            </div>

            {/* Option 3: Sur l'ID */}
            <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 ">
              <div className="flex items-center justify-between">
                <label htmlFor="id" className="text-lg text-gray-600">ID</label>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                  Voir ID
                </button>
              </div>
              <div className="flex items-center mt-2 text-gray-500">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <p>Connexion réussie en tant qu'entreprise "Inetum".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Parametre;
