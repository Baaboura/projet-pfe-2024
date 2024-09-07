import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateFichierBancaire from './CreateFichierBancaire';
import EditFichierBancaire from './EditFichierBancaire';
import Layout from '../layout';

const EspaceBanque = () => {
  const [fichierBancaires, setFichierBancaires] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [editFichierBancaireId, setEditFichierBancaireId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchFichierBancaires();
  }, []);

  const fetchFichierBancaires = async () => {
    try {
      const response = await axios.get('http://localhost:8030/fichierbancaire/getAllFichierBancaires');
      // console.log('Fetched data:', response.data);
      setFichierBancaires(response.data);
    } catch (error) {
      // console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8030/fichierbancaire/deleteFichierBancaire/${id}`);
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

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
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

  const handleExport = () => {
    const selectedData = fichierBancaires.filter((fb) => selectedRows.includes(fb.id));
    const printContent = selectedData.map((fb) => (
      `<tr key=${fb.id}>
        <td>${new Date(fb.dateDeCreation).toLocaleString()}</td>
        <td>${fb.codeCompte}</td>
        <td>${fb.rib}</td>
        <td>${fb.devise}</td>
        <td>${fb.montantInitial}</td>
        <td>${fb.montantFinal}</td>
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

  return (
    <Layout>
      <div className="container mx-auto p-8 ">
        {currentView === 'list' && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Fichier Bancaire</h1>
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
                      checked={selectedRows.length === fichierBancaires.length}
                    />
                  </th>
                  <th className="py-3 px-5">Date de Creation</th>
                  <th className="py-3 px-5">Code Compte</th>
                  <th className="py-3 px-5">RIB</th>
                  <th className="py-3 px-5 text-center">Devise</th>
                  <th className="py-3 px-8">Montant Initial</th>
                  <th className="py-3 px-8">Montant Final</th>
                  <th className="py-3 px-5">File Name</th>
                  <th className="py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fichierBancaires.map((fichierBancaire) => (
                  <tr key={fichierBancaire.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(fichierBancaire.id)}
                        onChange={() => handleRowSelect(fichierBancaire.id)}
                      />
                    </td>
                    <td className="py-3 px-5">{new Date(fichierBancaire.dateDeCreation).toLocaleDateString('fr-FR')}</td>
                    <td className="py-3 px-5">{fichierBancaire.codeCompte}</td>
                    <td className="py-3 px-5">{fichierBancaire.rib}</td>
                    <td className="py-3 px-5 text-center">{fichierBancaire.devise}</td>
                    <td className="py-3 px-5">{fichierBancaire.montantInitial} €</td>
                    <td className="py-3 px-5">{fichierBancaire.montantFinal} €</td>
                    <td className="py-3 px-5">{fichierBancaire.fileName}</td>
                    <td className="py-3 px-5 flex space-x-3">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition-all"
                        onClick={() => handleEditClick(fichierBancaire.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-all"
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
