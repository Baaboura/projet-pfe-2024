import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '../layout';

const DonneesSyncronise = () => {
  const [fichierBancaires, setFichierBancaires] = useState([]);
  const [fichierEntreprises, setFichierEntreprises] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsEntreprises, setSelectedRowsEntreprises] = useState([]);
 

  useEffect(() => {
    fetchFichierBancaires();
    fetchFichierEntreprises();
  }, []);

  const fetchFichierBancaires = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fichierbancaire/getAllFichierBancaires');
      console.log('Fetched data:', response.data);
      setFichierBancaires(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchFichierEntreprises = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fichierentreprise/getAllFichierEntreprise');
      console.log('Fetched data:', response.data);
      setFichierEntreprises(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDeleteBancaire = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fichierbancaire/deleteFichierBancaire/${id}`);
      fetchFichierBancaires();
    } catch (error) {
      console.error('Error deleting fichier bancaire', error);
    }
  };

  const handleDeleteEntreprise = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fichierentreprise/deleteFichierEntreprise/${id}`);
      fetchFichierEntreprises();
    } catch (error) {
      console.error('Error deleting fichier entreprise', error);
    }
  };


  const handleBackToList = () => {
    setCurrentView('list');
    fetchFichierBancaires();
    fetchFichierEntreprises();
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleRowSelectEntreprise = (id) => {
    setSelectedRowsEntreprises((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === fichierBancaires.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(fichierBancaires.map((fb) => fb.id));
    }
  };

  const handleSelectAllEntreprises = () => {
    if (selectedRowsEntreprises.length === fichierEntreprises.length) {
      setSelectedRowsEntreprises([]);
    } else {
      setSelectedRowsEntreprises(fichierEntreprises.map((fb) => fb.id));
    }
  };

  const handleExport = () => {
    const selectedData = fichierBancaires.filter((fb) => selectedRows.includes(fb.id));
    const printContent = selectedData.map((fb) => (
      `<tr key=${fb.id}>
        <td>${new Date(fb.dateDeCreation).toLocaleString()}</td>
        <td>${fb.codeCompte}</td>
        <td>${fb.rib}</td>
        <td>${fb.devise}</td>
        <td>${fb.montantInitial} €</td>
        <td>${fb.montantFinal} €</td>
        <td>${fb.fileName}</td>
      </tr>`
    )).join('');

    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<table border="1"><thead><tr><th>Date de Creation</th><th>Code Compte</th><th>RIB</th><th>Devise</th><th>Montant Initial</th><th>Montant Final</th><th>File Name</th></tr></thead><tbody>');
    printWindow.document.write(printContent);
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportEntreprises = () => {
    const selectedData = fichierEntreprises.filter((fb) => selectedRowsEntreprises.includes(fb.id));
    const printContent = selectedData.map((fb) => (
      `<tr key=${fb.id}>
        <td>${new Date(fb.date_de_transaction).toLocaleString()}</td>
        <td>${fb.code_compte}</td>
        <td>${fb.code_flux}</td>
        <td>${fb.devise}</td>
        <td>${fb.montant_de_transaction}</td>
        <td>${fb.reference}</td>
        <td>${fb.libelle}</td>
      </tr>`
    )).join('');

    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<table border="1"><thead><tr><th>Date de Transaction</th><th>Code Compte</th><th>Code Flux</th><th>Devise</th><th>Montant de Transaction</th><th>Référence</th><th>Libellé</th></tr></thead><tbody>');
    printWindow.document.write(printContent);
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <div className="container mx-auto p-8">
        {currentView === 'list' && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Fichier Synchroniser</h1>
            
           

            {/* Fichier Entreprises Table */}
            <div className="mb-8">
  <div className="flex justify-between mb-6">
    <div className="p-4 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between">
        <label htmlFor="erp" className="text-lg text-sky-900 font-bold">Fichier Entreprise</label> {/* Ajout de la classe font-bold ici */}
      </div>
    </div>
               {/*  {selectedRowsEntreprises.length > 0 && (
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
                    onClick={handleExportEntreprises}
                  >
                    Exporter
                  </button>
                )} */}
              </div>
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
  <thead className="bg-sky-900 text-white">
    <tr>
      <th className="py-3 px-8 w-24 text-center">Date de Transaction</th>
      <th className="py-3 px-5 text-center">Code Compte</th>
      <th className="py-3 px-5 text-center">Code Flux</th>
      <th className="py-3 px-5 text-center">Devise</th>
      <th className="py-3 px-5 text-center">Montant de Transaction</th>
      <th className="py-3 px-5 text-center">Libellé</th>
      <th className="py-3 px-5 text-center">Référence</th>
      <th className="py-3 px-5 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {fichierEntreprises.map((fichierEntreprise) => (
      <tr key={fichierEntreprise.id} className="border-b hover:bg-gray-50 transition">
        <td className="py-3 px-5 text-center">
          {new Date(fichierEntreprise.date_de_transaction).toLocaleDateString('fr-FR')}
        </td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.code_compte}</td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.code_flux}</td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.devise}</td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.montant_de_transaction} €</td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.reference}</td>
        <td className="py-3 px-5 text-center">{fichierEntreprise.libelle}</td>
        <td className="py-3 px-5 flex justify-center space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
            onClick={() => handleDeleteEntreprise(fichierEntreprise.id)}
          >
            Supprimer
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
             {/* Fichier Bancaires Table */}
             <div className="mb-8">
  <div className="flex justify-between mb-6">
  <div className="p-4 bg-gray-100 shadow-md">
  <div className="flex items-center justify-between">
        <label htmlFor="erp" className="text-lg text-sky-900 font-bold">Fichier Bancaire</label> {/* Ajout de la classe font-bold ici */}
      </div>
    </div>
               {/*  {selectedRows.length > 0 && (
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
                    onClick={handleExport}
                  >
                    Exporter
                  </button>
                )} */}
              </div>
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
  <thead className="bg-sky-900 text-white">
    <tr>
      <th className="py-3 px-5 text-center">Date de Creation</th>
      <th className="py-3 px-5 text-center">Code Compte</th>
      <th className="py-3 px-5 text-center">RIB</th>
      <th className="py-3 px-5 text-center">Devise</th>
      <th className="py-3 px-5 text-center">Montant Initial</th>
      <th className="py-3 px-5 text-center">Montant Final</th>
      <th className="py-3 px-5 text-center">File Name</th>
      <th className="py-3 px-5 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {fichierBancaires.map((fichierBancaire) => (
      <tr key={fichierBancaire.id} className="border-b hover:bg-gray-50 transition">
        <td className="py-3 px-5 text-center">
          {new Date(fichierBancaire.dateDeCreation).toLocaleDateString('fr-FR')}
        </td>
        <td className="py-3 px-5 text-center">{fichierBancaire.codeCompte}</td>
        <td className="py-3 px-5 text-center">{fichierBancaire.rib}</td>
        <td className="py-3 px-5 text-center">{fichierBancaire.devise}</td>
        <td className="py-3 px-5 text-center">{fichierBancaire.montantInitial} €</td>
        <td className="py-3 px-5 text-center">{fichierBancaire.montantFinal} €</td>
        <td className="py-3 px-5 text-center">{fichierBancaire.fileName}</td>
        <td className="py-3 px-5 flex justify-center space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
            onClick={() => handleDeleteBancaire(fichierBancaire.id)}
          >
            Supprimer
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DonneesSyncronise;
