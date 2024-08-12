import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFichierEntreprise = ({ id, onBack }) => {
  const [fichierEntreprise, setFichierEntreprise] = useState(null);

  useEffect(() => {
    fetchFichierEntreprise();
  }, []);

  const fetchFichierEntreprise = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fichierentreprise/getFichierEntreprise/${id}`);
      setFichierEntreprise(response.data);
    } catch (error) {
      console.error('Error fetching fichier entreprise', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/fichierentreprise/updateFichierEntreprise/${id}`, fichierEntreprise);
      onBack();
    } catch (error) {
      console.error('Error updating fichier entreprise', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichierEntreprise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!fichierEntreprise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Modifier Fichier Entreprise</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date de Création</label>
          <input
            type="datetime-local"
            name="dateDeCreation"
            value={fichierEntreprise.dateDeCreation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Code Compte</label>
          <input
            type="text"
            name="codeCompte"
            value={fichierEntreprise.codeCompte}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">RIB</label>
          <input
            type="text"
            name="Rib"
            value={fichierEntreprise.Rib}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Devise</label>
          <input
            type="text"
            name="devise"
            value={fichierEntreprise.devise}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Montant Initial</label>
          <input
            type="number"
            name="montantInitial"
            value={fichierEntreprise.montantInitial}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Montant Final</label>
          <input
            type="number"
            name="montantFinal"
            value={fichierEntreprise.montantFinal}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nom du Fichier</label>
          <input
            type="text"
            name="fileName"
            value={fichierEntreprise.fileName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all"
            onClick={handleUpdate}
          >
            Mettre à jour
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-6 py-2 rounded shadow hover:bg-gray-700 transition-all"
            onClick={onBack}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFichierEntreprise;
