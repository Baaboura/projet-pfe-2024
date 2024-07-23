import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateFichierBancaire from './CreateFichierBancaire';
import EditFichierBancaire from './EditFichierBancaire';
import Layout from '../layout';

const EspaceBanque = () => {
  const [fichierBancaires, setFichierBancaires] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [editFichierBancaireId, setEditFichierBancaireId] = useState(null);

  useEffect(() => {
    fetchFichierBancaires();
  }, []);

  const fetchFichierBancaires = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fichierbancaire/getAllFichierBancaires');
      setFichierBancaires(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fichierbancaire/deleteFichierBancaire/${id}`);
      fetchFichierBancaires();
    } catch (error) {
      console.error('Error deleting fichier bancaire', error);
    }
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (id) => {
    setEditFichierBancaireId(id);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    fetchFichierBancaires();
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {currentView === 'list' && (
          <>
            <h1 className="text-2xl font-bold mb-4">Fichier Bancaire List</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleCreateClick}
            >
              Créer
            </button>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date de Creation</th>
                  <th className="py-2 px-4 border-b">Code Compte</th>
                  <th className="py-2 px-4 border-b">RIB</th>
                  <th className="py-2 px-4 border-b">Devise</th>
                  <th className="py-2 px-4 border-b">Montant Initial</th>
                  <th className="py-2 px-4 border-b">Montant Final</th>
                  <th className="py-2 px-4 border-b">File Name</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fichierBancaires.map((fichierBancaire) => (
                  <tr key={fichierBancaire.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{fichierBancaire.dateDeCreation}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.codeCompte}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.Rib}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.devise}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.montantInitial}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.montantFinal}</td>
                    <td className="py-2 px-4 border-b">{fichierBancaire.fileName}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEditClick(fichierBancaire.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(fichierBancaire.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {currentView === 'create' && <CreateFichierBancaire onBack={handleBackToList} />}
        {currentView === 'edit' && <EditFichierBancaire id={editFichierBancaireId} onBack={handleBackToList} />}
      </div>
    </Layout>
  );
};

export default EspaceBanque;
