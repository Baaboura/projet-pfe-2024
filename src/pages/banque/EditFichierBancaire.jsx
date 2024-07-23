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
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Modifier Fichier Bancaire</h2>
      <input
        type="text"
        placeholder="Code Compte"
        value={fichierBancaire.codeCompte}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, codeCompte: e.target.value })}
        className="block w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="RIB"
        value={fichierBancaire.Rib}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, Rib: e.target.value })}
        className="block w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Devise"
        value={fichierBancaire.devise}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, devise: e.target.value })}
        className="block w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Montant Initial"
        value={fichierBancaire.montantInitial}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantInitial: e.target.value })}
        className="block w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Montant Final"
        value={fichierBancaire.montantFinal}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantFinal: e.target.value })}
        className="block w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="File Name"
        value={fichierBancaire.fileName}
        onChange={(e) => setFichierBancaire({ ...fichierBancaire, fileName: e.target.value })}
        className="block w-full mb-4 px-3 py-2 border rounded"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleUpdate}
      >
        Modifier
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={onBack}
      >
        Retour
      </button>
    </div>
  );
};

export default EditFichierBancaire;
