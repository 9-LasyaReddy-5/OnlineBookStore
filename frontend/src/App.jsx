import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', stock: '' })
  const [adding, setAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [message, setMessage] = useState(null)

  // Show temporary messages
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    let filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    setFilteredBooks(filtered)
  }, [books, searchTerm, sortBy, sortOrder])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:8080/api/books')
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      console.error('API Error:', err)
      setError(err.message)
      // Set some sample data so the UI is not completely blank
      setBooks([
        { id: 1, title: 'Sample Book 1', author: 'Sample Author', price: 29.99, stock: 5 },
        { id: 2, title: 'Sample Book 2', author: 'Another Author', price: 19.99, stock: 3 }
      ])
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (e) => {
    e.preventDefault()
    if (!newBook.title || !newBook.author || !newBook.price || !newBook.stock) {
      showMessage('Please fill in all fields', 'error')
      return
    }

    try {
      setAdding(true)
      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newBook.title,
          author: newBook.author,
          price: parseFloat(newBook.price),
          stock: parseInt(newBook.stock)
        })
      })
      if (!response.ok) throw new Error('Failed to add book')
      setNewBook({ title: '', author: '', price: '', stock: '' })
      setShowForm(false)
      fetchBooks()
      showMessage('Book added successfully!')
    } catch (err) {
      setError(err.message)
      showMessage('Failed to add book', 'error')
    } finally {
      setAdding(false)
    }
  }

  const updateBook = async (e) => {
    e.preventDefault()
    if (!editingBook.title || !editingBook.author || !editingBook.price || !editingBook.stock) {
      showMessage('Please fill in all fields', 'error')
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/books/${editingBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingBook.title,
          author: editingBook.author,
          price: parseFloat(editingBook.price),
          stock: parseInt(editingBook.stock)
        })
      })
      if (!response.ok) throw new Error('Failed to update book')
      setShowEditModal(false)
      setEditingBook(null)
      fetchBooks()
      showMessage('Book updated successfully!')
    } catch (err) {
      setError(err.message)
      showMessage('Failed to update book', 'error')
    }
  }

  const deleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book? This action cannot be undone.')) return
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete book')
      fetchBooks()
      showMessage('Book deleted successfully!')
    } catch (err) {
      setError(err.message)
      showMessage('Failed to delete book', 'error')
    }
  }

  const openEditModal = (book) => {
    setEditingBook({ ...book })
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setEditingBook(null)
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  if (loading && books.length === 0) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <h2>📚 Loading Book Inventory...</h2>
      <p>Connecting to database...</p>
    </div>
  )

  if (error) return (
    <div className="error">
      <h2>⚠️ Connection Issue</h2>
      <p>{error}</p>
      <p>Using sample data for demonstration.</p>
      <button onClick={() => { setError(null); fetchBooks(); }}>Retry Connection</button>
    </div>
  )

  return (
    <div className="App">
      {/* Message Display */}
      {message && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      <header className="header">
        <h1>📚 Book Inventory Manager</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="🔍 Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Add Book'}
          </button>
        </div>
      </header>

      {showForm && (
        <form className="add-book-form" onSubmit={addBook}>
          <h2>Add New Book</h2>
          <div className="form-row">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              step="0.01"
              placeholder="Price ($)"
              value={newBook.price}
              onChange={(e) => setNewBook({...newBook, price: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={newBook.stock}
              onChange={(e) => setNewBook({...newBook, stock: e.target.value})}
              required
            />
          </div>
          <button type="submit" disabled={adding} className="submit-btn">
            {adding ? '⏳ Adding...' : '✅ Add Book'}
          </button>
        </form>
      )}

      {/* Statistics Cards */}
      <div className="stats">
        <div className="stat-card">
          <h3>{books.length}</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h3>{books.reduce((sum, book) => sum + (book.stock || 0), 0)}</h3>
          <p>Total Stock</p>
        </div>
        <div className="stat-card">
          <h3>${books.reduce((sum, book) => sum + ((book.price || 0) * (book.stock || 0)), 0).toFixed(2)}</h3>
          <p>Inventory Value</p>
        </div>
        <div className="stat-card">
          <h3>{books.filter(book => (book.stock || 0) < 5).length}</h3>
          <p>Low Stock Items</p>
        </div>
      </div>

      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} className="sortable">
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('author')} className="sortable">
                Author {sortBy === 'author' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('price')} className="sortable">
                Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('stock')} className="sortable">
                Stock {sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  {books.length === 0 ? '📖 No books in inventory. Add some!' : '🔍 No books match your search.'}
                </td>
              </tr>
            ) : (
              filteredBooks.map(book => (
                <tr key={book.id} className="book-row">
                  <td>
                    <div className="book-title">{book.title || 'N/A'}</div>
                  </td>
                  <td>
                    <div className="book-author">{book.author || 'N/A'}</div>
                  </td>
                  <td>
                    <span className="price-text">${(book.price || 0).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`stock-badge ${
                      (book.stock || 0) === 0 ? 'out-of-stock' :
                      (book.stock || 0) < 5 ? 'low-stock' : 'in-stock'
                    }`}>
                      📦 {(book.stock || 0)}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => openEditModal(book)} title="Edit book">
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteBook(book.id)} title="Delete book">
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showEditModal && editingBook && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Edit Book</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={updateBook}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="📖 Book Title"
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="👤 Author Name"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="💰 Price ($)"
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({...editingBook, price: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="📦 Stock Quantity"
                    value={editingBook.stock}
                    onChange={(e) => setEditingBook({...editingBook, stock: e.target.value})}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="edit-btn" onClick={() => setShowEditModal(false)}>
                ❌ Cancel
              </button>
              <button type="submit" className="submit-btn" onClick={updateBook}>
                ✅ Update Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
