import React, { useState } from 'react';
import axios from 'axios';

const CreateFichierEntreprise = ({ onBack }) => {
  const [fichierEntreprise, setFichierEntreprise] = useState({
    date_de_transaction: '',
    code_compte: '',
    code_flux: '',
    devise: '',
    montant_de_transaction: '',
    reference: '',
    libelle: '',
  });

  const [errors, setErrors] = useState({
    date_de_transaction: '',
    code_compte: '',
    code_flux: '',
    devise: '',
    montant_de_transaction: '',
    reference: '',
    libelle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichierEntreprise({ ...fichierEntreprise, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate each field
    if (!fichierEntreprise.date_de_transaction) {
      newErrors.date_de_transaction = 'Date de transaction is required.';
      isValid = false;
    }
    if (!fichierEntreprise.code_compte.trim()) {
      newErrors.code_compte = 'Code Compte is required.';
      isValid = false;
    }
    if (!fichierEntreprise.code_flux.trim()) {
      newErrors.code_flux = 'Code Flux is required.';
      isValid = false;
    }
    if (!fichierEntreprise.devise.trim()) {
      newErrors.devise = 'Devise is required.';
      isValid = false;
    }
    if (!fichierEntreprise.montant_de_transaction || isNaN(fichierEntreprise.montant_de_transaction) || parseFloat(fichierEntreprise.montant_de_transaction) <= 0) {
      newErrors.montant_de_transaction = 'Montant de transaction must be a positive number.';
      isValid = false;
    }
    if (!fichierEntreprise.reference || isNaN(fichierEntreprise.reference) || parseFloat(fichierEntreprise.reference) <= 0) {
      newErrors.reference = 'Reference must be a positive number.';
      isValid = false;
    }
    if (!fichierEntreprise.libelle.trim()) {
      newErrors.libelle = 'Libelle is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {

      const dataToSend = {
        ...fichierEntreprise,
        montant_de_transaction: parseFloat(fichierEntreprise.montant_de_transaction),
      };
      console.log(dataToSend);  
      await axios.post('http://localhost:8080/fichierentreprise/addFichierEntreprise', dataToSend);
      onBack();
    } catch (error) {
      console.error('Error creating fichier entreprise', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Créer Fichier Entreprise</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date de Transaction</label>
          <input
            type="datetime-local"
            name="date_de_transaction"
            value={fichierEntreprise.date_de_transaction}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.date_de_transaction && <p className="text-red-500 text-sm">{errors.date_de_transaction}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Code Compte</label>
          <input
            type="text"
            name="code_compte"
            value={fichierEntreprise.code_compte}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.code_compte && <p className="text-red-500 text-sm">{errors.code_compte}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Code Flux</label>
          <input
            type="text"
            name="code_flux"
            value={fichierEntreprise.code_flux}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.code_flux && <p className="text-red-500 text-sm">{errors.code_flux}</p>}
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
          {errors.devise && <p className="text-red-500 text-sm">{errors.devise}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Montant de Transaction</label>
          <input
            type="number"
            name="montant_de_transaction"
            value={fichierEntreprise.montant_de_transaction}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.montant_de_transaction && <p className="text-red-500 text-sm">{errors.montant_de_transaction}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Reference</label>
          <input
            type="number"
            name="reference"
            value={fichierEntreprise.reference}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.reference && <p className="text-red-500 text-sm">{errors.reference}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Libelle</label>
          <input
            type="text"
            name="libelle"
            value={fichierEntreprise.libelle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.libelle && <p className="text-red-500 text-sm">{errors.libelle}</p>}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all"
            onClick={handleCreate}
          >
            Créer
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

export default CreateFichierEntreprise;
