import './App.css';

function App() {
  // This will hold the user information
  const user = null;

  // This will hold the uploaded image URL
  const uploadedImageURL = null;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Authentication & File Upload Demo</h1>
        {/* Check if the user exists (is logged in) to show the login or welcome screen */}
        {!user ? (
          <>
            <form>
              <h3>Login</h3>
              <input
                type="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>

            <form>
              <h3>Sign Up</h3>
              <input
                type="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                required
              />
              <button type="submit">Sign Up</button>
            </form>

            <button>Sign Up with Google</button>
          </>
        ) : (
          <div>
            <p>Welcome, {user?.displayName || user?.email}</p>
            <button>Sign Out</button>

            {/* Image upload section */}
            <h3>Upload an Image</h3>
            <input type="file" />
            <button>Upload</button>

            {/* Display uploaded image if there is one*/}
            {uploadedImageURL && (
              <div>
                <h4>Uploaded Image:</h4>
                <img
                  alt="Uploaded"
                  style={{ width: "300px", height: "auto" }}
                />
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
