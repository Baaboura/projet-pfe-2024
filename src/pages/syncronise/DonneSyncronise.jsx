import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '../layout';

const DonneesSyncronise = () => {
  const [fichierBancaires, setFichierBancaires] = useState([]);
  const [fichierEntreprises, setFichierEntreprises] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsEntreprises, setSelectedRowsEntreprises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); // State for the filter input

  // Filter the data based on the search term
  const filteredItems = fichierEntreprises.filter((item) => {
    // Convert all fields to strings and check for inclusion of the search term
    const searchText = searchTerm.toLowerCase();

    // Check if any relevant field contains the search text
    return (
        item.code_compte?.toLowerCase().includes(searchText) ||
        item.code_flux?.toLowerCase().includes(searchText) ||
        item.devise?.toLowerCase().includes(searchText) ||
        item.libelle?.toLowerCase().includes(searchText) ||
        item.reference?.toLowerCase().includes(searchText)
    );
  });


  // Calculate the indices of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the filtered items to display on the current page
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change when clicking a page number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  ///*************************************************
  const [currentPage2, setCurrentPage2] = useState(1);
  const itemsPerPage2 = 5; // Number of items per page
  const [searchTerm2, setSearchTerm2] = useState(''); // State for the filter input
  const filteredItems2 = fichierBancaires.filter((item) => {
    const searchText2 = searchTerm2.toLowerCase();

    return (
        item.codeCompte?.toLowerCase().includes(searchText2) ||
        item.rib?.toLowerCase().includes(searchText2) ||
        item.devise?.toLowerCase().includes(searchText2) ||
        item.fileName?.toLowerCase().includes(searchText2)
    );
  });


  // Calculate the indices of the first and last item on the current page
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;

  // Slice the filtered items to display on the current page
  const currentItems2 = filteredItems2.slice(indexOfFirstItem2, indexOfLastItem2);

  // Calculate the total number of pages
  const totalPages2 = Math.ceil(filteredItems2.length / itemsPerPage2);

  // Handle page change when clicking a page number
  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
  };

  // Handle next and previous buttons
  const handleNextPage2 = () => {
    if (currentPage2 < totalPages2) {
      setCurrentPage2(currentPage2 + 1);
    }
  };

  const handlePreviousPage2 = () => {
    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  };
  useEffect(() => {
    fetchFichierBancaires();
    fetchFichierEntreprises();
  }, []);

  const fetchFichierBancaires = async () => {
    try {
      const response = await axios.get('http://localhost:8030/fichierbancaire/getAllFichierBancaires');
      // console.log('Fetched data:', response.data);
      setFichierBancaires(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchFichierEntreprises = async () => {
    try {
      const response = await axios.get('http://localhost:8030/fichierentreprise/getAllFichierEntreprise');
      // console.log('Fetched data:', response.data);
      setFichierEntreprises(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDeleteBancaire = async (id) => {
    try {
      await axios.delete(`http://localhost:8030/fichierbancaire/deleteFichierBancaire/${id}`);
      fetchFichierBancaires();
    } catch (error) {
      console.error('Error deleting fichier bancaire', error);
    }
  };

  const handleDeleteEntreprise = async (id) => {
    try {
      await axios.delete(`http://localhost:8030/fichierentreprise/deleteFichierEntreprise/${id}`);
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
                    <div className="bg-gray-100 rounded-lg p-2 flex gap-2">
                      <svg viewBox="0 0 24 24" className="w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                      </svg>
                      <input
                          type="text"
                          placeholder="Filtre"
                          className="border p-2 rounded w-full"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to the first page when filtering
                          }}/>
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
                  <div className="flex justify-between mb-12">

                    {/*  {selectedRowsEntreprises.length > 0 && (
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all"
                    onClick={handleExportEntreprises}
                  >
                    Exporter
                  </button>
                )} */}
                  </div>

                  <div>
                    {/* Search Input for Filtering */}

                    <table className="min-w-full bg-white">
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
                      {currentItems.map((fichierEntreprise) => (
                          <tr
                              key={fichierEntreprise.id}
                              className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="py-3 px-5 text-center">
                              {new Date(fichierEntreprise.date_de_transaction).toLocaleDateString(
                                  'fr-FR'
                              )}
                            </td>
                            <td className="py-3 px-5 text-center">{fichierEntreprise.code_compte}</td>
                            <td className="py-3 px-5 text-center">{fichierEntreprise.code_flux}</td>
                            <td className="py-3 px-5 text-center">{fichierEntreprise.devise}</td>
                            <td className="py-3 px-5 text-center">
                              {fichierEntreprise.montant_de_transaction} €
                            </td>
                            <td className="py-3 px-5 text-center">{fichierEntreprise.libelle}</td>
                            <td className="py-3 px-5 text-center">{fichierEntreprise.reference}</td>
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

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-2">
                      {/* Previous Button */}
                      <button
                          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                      >
                        Précédent
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, index) => (
                          <button
                              key={index + 1}
                              className={`px-3 py-1 rounded ${
                                  currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                              }`}
                              onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                      ))}

                      {/* Next Button */}
                      <button
                          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                      >
                        Suivant
                      </button>
                    </div>
                  </div>

                </div>
                {/* Fichier Bancaires Table */}
                <div className="mb-8">
                  <div className="flex justify-between mb-6">
                    <div className="p-4 bg-gray-100 shadow-md">
                      <div className="flex items-center justify-between">
                        <label htmlFor="erp" className="text-lg text-sky-900 font-bold">Fichier Bancaire</label> {/* Ajout de la classe font-bold ici */}
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 flex gap-2">
                      <svg viewBox="0 0 24 24" className="w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                      </svg>
                      <input
                          type="text"
                          placeholder="Filtre"
                          className="border p-2 rounded w-full"
                          value={searchTerm2}
                          onChange={(e) => {
                            setSearchTerm2(e.target.value);
                            setCurrentPage2(1); // Reset to the first page when filtering
                          }}/>
                    </div>
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
                    {currentItems2.map((fichierBancaire) => (
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
                  <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        className={`px-3 py-1 rounded ${currentPage2 === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                        onClick={() => handlePageChange2(currentPage2 - 1)}
                        disabled={currentPage2 === 1}
                    >
                      Précédent
                    </button>
                    {Array.from({ length: totalPages2 }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-3 py-1 rounded ${currentPage2 === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                            onClick={() => handlePageChange2(index + 1)}
                        >
                          {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 rounded ${currentPage2 === totalPages2 ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                        onClick={() => handlePageChange2(currentPage2 + 1)}
                        disabled={currentPage2 === totalPages2}
                    >
                      Suivant
                    </button>
                  </div>

                </div>
              </>
          )}
        </div>
      </Layout>
  );
};

export default DonneesSyncronise;
