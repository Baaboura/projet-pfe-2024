import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateFichierEntreprise from './CreateFichierEntreprise';
import EditFichierEntreprise from './EditFichierEntreprise';
import Layout from '../layout';

const EspaceEntreprise = () => {
  const [fichierEntreprises, setFichierEntreprises] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [editFichierEntrepriseId, setEditFichierEntrepriseId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchFichierEntreprises();
  }, []);

  const fetchFichierEntreprises = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fichierentreprise/getAllFichierEntreprise');
      console.log('Fetched data:', response.data);
      setFichierEntreprises(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fichierentreprise/deleteFichierEntreprise/${id}`);
      fetchFichierEntreprises();
    } catch (error) {
      console.error('Error deleting fichier entreprise', error);
    }
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (id) => {
    setEditFichierEntrepriseId(id);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    fetchFichierEntreprises();
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === fichierEntreprises.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(fichierEntreprises.map((fb) => fb.id));
    }
  };

  const handleExport = () => {
    const selectedData = fichierEntreprises.filter((fb) => selectedRows.includes(fb.id));
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
    printWindow.document.write('<table border="1"><thead><tr><th>Date de Creation</th><th>Code Compte</th><th>RIB</th><th>Devise</th><th>Montant Initial</th><th>Montant Final</th><th>File Name</th></tr></thead><tbody>');
    printWindow.document.write(printContent);
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <div className="container mx-auto p-8 ">
        {currentView === 'list' && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Fichier Entreprise</h1>
            <div className="flex justify-between mb-6">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
                onClick={handleCreateClick}
              >
                Créer
              </button>
              {selectedRows.length > 0 && (
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
                  onClick={handleExport}
                >
                  Exporter/Importer
                </button>
              )}
            </div>
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-sky-900 text-white">
                <tr>
                  <th className="py-3 px-5">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === fichierEntreprises.length}
                    />
                  </th>
                  <th className="py-3 px-5">Date de Creation</th>
                  <th className="py-3 px-5">Code Compte</th>
                  <th className="py-3 px-5">RIB</th>
                  <th className="py-3 px-5">Devise</th>
                  <th className="py-3 px-5">Montant Initial</th>
                  <th className="py-3 px-5">Montant Final</th>
                  <th className="py-3 px-5">File Name</th>
                  <th className="py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fichierEntreprises.map((fichierEntreprise) => (
                  <tr key={fichierEntreprise.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(fichierEntreprise.id)}
                        onChange={() => handleRowSelect(fichierEntreprise.id)}
                      />
                    </td>
                    <td className="py-3 px-5">{new Date(fichierEntreprise.date_de_transaction).toLocaleString()}</td>
                    <td className="py-3 px-5">{fichierEntreprise.code_compte}</td>
                    <td className="py-3 px-5">{fichierEntreprise.code_flux}</td>
                    <td className="py-3 px-5">{fichierEntreprise.devise}</td>
                    <td className="py-3 px-5">{fichierEntreprise.montant_de_transaction}</td>
                    <td className="py-3 px-5">{fichierEntreprise.reference}</td>
                    <td className="py-3 px-5">{fichierEntreprise.libelle}</td>
                    <td className="py-3 px-5 flex space-x-3">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition-all"
                        onClick={() => handleEditClick(fichierEntreprise.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
                        onClick={() => handleDelete(fichierEntreprise.id)}
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

        {currentView === 'create' && <CreateFichierEntreprise onBack={handleBackToList} />}
        {currentView === 'edit' && <EditFichierEntreprise id={editFichierEntrepriseId} onBack={handleBackToList} />}
      </div>
    </Layout>
  );
};

export default EspaceEntreprise;
