import React, { useState } from 'react';
import axios from 'axios';

const CreateFichierBancaire = ({ onBack }) => {
  const [fichierBancaire, setFichierBancaire] = useState({
    dateDeCreation: '',
    codeCompte: '',
    rib: '',
    devise: '',
    montantInitial: '',
    montantFinal: '',
    fileName: '',
  });

  const [errors, setErrors] = useState({
    codeCompte: '',
    rib: '',
    devise: '',
    montantInitial: '',
    montantFinal: '',
    fileName: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!fichierBancaire.codeCompte) {
      newErrors.codeCompte = 'Code Compte is required.';
      isValid = false;
    }
    if (!fichierBancaire.rib) {
      newErrors.rib = 'RIB is required.';
      isValid = false;
    }
    if (!fichierBancaire.devise) {
      newErrors.devise = 'Devise is required.';
      isValid = false;
    }
    if (!fichierBancaire.montantInitial || isNaN(fichierBancaire.montantInitial) || parseFloat(fichierBancaire.montantInitial) <= 0) {
      newErrors.montantInitial = 'Montant Initial must be a positive number.';
      isValid = false;
    }
    if (!fichierBancaire.montantFinal || isNaN(fichierBancaire.montantFinal) || parseFloat(fichierBancaire.montantFinal) <= 0) {
      newErrors.montantFinal = 'Montant Final must be a positive number.';
      isValid = false;
    }
    if (!fichierBancaire.fileName) {
      newErrors.fileName = 'File Name is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {
      const dataToSend = {
        ...fichierBancaire,
        montantInitial: parseFloat(fichierBancaire.montantInitial),
        montantFinal: parseFloat(fichierBancaire.montantFinal),
      };
      await axios.post('http://localhost:8030/fichierbancaire/addFichierBancaire', dataToSend);
      // console.log(dataToSend);
      onBack();
    } catch (error) {
      console.error('Error creating fichier bancaire', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Créer un nouveau Fichier Bancaire</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Code Compte"
            value={fichierBancaire.codeCompte}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, codeCompte: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.codeCompte && <p className="text-red-500 text-sm">{errors.codeCompte}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="RIB"
            value={fichierBancaire.rib}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, rib: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rib && <p className="text-red-500 text-sm">{errors.rib}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Devise"
            value={fichierBancaire.devise}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, devise: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.devise && <p className="text-red-500 text-sm">{errors.devise}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Montant Initial"
            value={fichierBancaire.montantInitial}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantInitial: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.montantInitial && <p className="text-red-500 text-sm">{errors.montantInitial}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Montant Final"
            value={fichierBancaire.montantFinal}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, montantFinal: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.montantFinal && <p className="text-red-500 text-sm">{errors.montantFinal}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="File Name"
            value={fichierBancaire.fileName}
            onChange={(e) => setFichierBancaire({ ...fichierBancaire, fileName: e.target.value })}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fileName && <p className="text-red-500 text-sm">{errors.fileName}</p>}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition-all mr-3"
          onClick={onBack}
        >
          Retour
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          onClick={handleCreate}
        >
          Créer
        </button>
      </div>
    </div>
  );
};

export default CreateFichierBancaire;
