import { useState, useMemo } from 'react';
import Article from './components/Article'
import './App.css'
import UsersWithHOCS from './components/Users';

const useQueryParams = () => {
    return useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const updateUrl = (params) => {
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState(null, "", newUrl);
        };
        
        return {
            searchParams,
            setParam: (paramName, value) => {
                updateUrl(`${paramName}=${value}`);
                searchParams.set(paramName, value);
            },
            getParam: (paramName) => searchParams.get(paramName),
        }
    }, [])
};

function App() {
    const [isArticle, setIsArticle] = useState(true);
    const { setParam } = useQueryParams();
    const onClick = () => {

        setIsArticle(prev => {
            setParam('page', !prev ?  'article' : 'users')
            return !prev;
        });
    };
 
    return (
        <div>
            <button
                onClick={onClick}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "2px solid #007bff",
                    borderRadius: "25px",
                    backgroundColor: isArticle ? "#007bff" : "#ccc",
                    color: isArticle ? "white" : "#333",
                    cursor: "pointer",
                    transition: "background-color 0.3s, color 0.3s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                }}
            >
                Show {isArticle ? "Users" : "Article"} Page
            </button>

            {isArticle ? <Article /> : <UsersWithHOCS />}
        </div>
    );
}

export default App;