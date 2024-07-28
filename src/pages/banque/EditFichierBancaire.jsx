import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFichierBancaire = ({ id, onBack }) => {
  const [fichierBancaire, setFichierBancaire] = useState({
    dateDeCreation: '',
    codeCompte: '',
    Rib: '',
    devise: '',
    montantInitial: '',
    montantFinal: '',
    fileName: '',
  });

  useEffect(() => {
    const fetchFichierBancaire = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/fichierbancaire/getFichierBancaireById/${id}`);
        setFichierBancaire(response.data);
      } catch (error) {
        console.error('Error fetching fichier bancaire', error);
      }
    };

    fetchFichierBancaire();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/fichierbancaire/updateFichierBancaireById/${id}`, fichierBancaire);
      onBack();
    } catch (error) {
      console.error('Error updating fichier bancaire', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Modifier Fichier Bancaire</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Code Compte"
          value={fichierBancaire.codeCompte}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, codeCompte: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="RIB"
          value={fichierBancaire.Rib}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, Rib: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Devise"
          value={fichierBancaire.devise}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, devise: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Montant Initial"
          value={fichierBancaire.montantInitial}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantInitial: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Montant Final"
          value={fichierBancaire.montantFinal}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantFinal: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="File Name"
          value={fichierBancaire.fileName}
          onChange={(e) => setFichierBancaire({ ...fichierBancaire, fileName: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition-all mr-3"
          onClick={onBack}
        >
          Retour
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
          onClick={handleUpdate}
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default EditFichierBancaire;
