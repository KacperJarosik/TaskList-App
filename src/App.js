import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function listsToText(lists) {
  let text = '';
  lists.forEach(list => {
    text += `${list.title}\n`;
    list.items.forEach(item => {
      text += `${item.text},${item.date}\n`;
    });
    text += '\n';
  });
  return text;
}

function textToLists(text) {
  const lines = text.trim().split('\n');
  const lists = [];
  let currentList = null;
  lines.forEach(line => {
    if (line.trim() === '') {
      currentList = null;
    } else if (!currentList) {
      currentList = { title: line.trim(), items: [] };
      lists.push(currentList);
    } else {
      const [text, date] = line.split(',');
      currentList.items.push({ text, date });
    }
  });
  return lists;
}

function App() {
  const [lists, setLists] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedLists = localStorage.getItem('lists');
    if (savedLists) {
      setLists(textToLists(savedLists));
      setNextId(textToLists(savedLists).reduce((maxId, list) => Math.max(maxId, Math.max(...list.items.map(item => item.id))), 0) + 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', listsToText(lists));
  }, [lists]);

  const addItem = (listId, itemText, itemDate) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        return { ...list, items: [...list.items, { id: nextId, text: itemText, date: itemDate }] };
      }
      return list;
    });
    setLists(newLists);
    setNextId(prevId => prevId + 1);
  };

  const removeItem = (listId, itemId) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.filter(item => item.id !== itemId);
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setLists(newLists);
  };

  const updateItemText = (listId, itemId, newText) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.map(item => {
          if (item.id === itemId) {
            return { ...item, text: newText };
          }
          return item;
        });
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setLists(newLists);
  };

  const updateItemDate = (listId, itemId, newDate) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.map(item => {
          if (item.id === itemId) {
            return { ...item, date: newDate };
          }
          return item;
        });
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setLists(newLists);
  };

  const addList = (title) => {
    const newList = {
      id: nextId,
      title: title || `Lista ${nextId}`,
      items: []
    };
    setNextId(prevId => prevId + 1);
    setLists([...lists, newList]);
  };

  const removeList = (listId) => {
    const newLists = lists.filter(list => list.id !== listId);
    setLists(newLists);
  };

  const updateListTitle = (listId, newTitle) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        return { ...list, title: newTitle };
      }
      return list;
    });
    setLists(newLists);
  };

  const sortListByDate = (list) => {
    return list.items.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const importListsFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setLists(textToLists(text));
      setNextId(textToLists(text).reduce((maxId, list) => Math.max(maxId, Math.max(...list.items.map(item => item.id))), 0) + 1);
    };
    reader.readAsText(file);
  };

  const exportListsToFile = () => {
    const element = document.createElement('a');
    const file = new Blob([listsToText(lists)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'lists.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Rozwijana lista</h1>
          {lists.map(list => (
              <div key={list.id}>
                <h2>
                  <input
                      type="text"
                      value={list.title}
                      onChange={(e) => updateListTitle(list.id, e.target.value)}
                  />
                </h2>
                <ul>
                  {sortListByDate(list).map((item, index) => (
                      <li key={item.id}>
                        <input
                            type="text"
                            value={item.text}
                            onChange={(e) => updateItemText(list.id, item.id, e.target.value)}
                        />
                        <input
                            type="date"
                            value={item.date}
                            onChange={(e) => updateItemDate(list.id, item.id, e.target.value)}
                        />
                        <button onClick={() => removeItem(list.id, item.id)}>Usuń</button>
                      </li>
                  ))}
                </ul>
                <div>
                  <input type="text" placeholder="Nowy punkt" id={`newItem-${list.id}`} />
                  <input type="date" id={`newItemDate-${list.id}`} />
                  <button onClick={() => addItem(list.id, document.getElementById(`newItem-${list.id}`).value, document.getElementById(`newItemDate-${list.id}`).value)}>Dodaj punkt</button>
                </div>
                <button onClick={() => removeList(list.id)}>Usuń listę</button>
              </div>
          ))}
          <div>
            <input type="text" placeholder="Nazwa listy" id="newListTitle" />
            <button onClick={() => addList(document.getElementById('newListTitle').value)}>Dodaj nową listę</button>
          </div>
          <div>
            <input type="file" onChange={(e) => importListsFromFile(e.target.files[0])} />
            <button onClick={exportListsToFile}>Exportuj listy</button>
          </div>
        </header>
      </div>
  );
}

export default App;
