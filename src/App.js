import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriendsList((friendsList) => [...friendsList, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendsList={friendsList} />
        {showAddFriend && (
          <FormAddFriend
            friendsList={friendsList}
            onAddFriend={handleAddFriend}
          />
        )}

        <Button showAddFriend={showAddFriend} onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

// ////////////////////////////////////////////////////

function FriendsList({ friendsList }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend friendObj={friend} key={friend.id} />
      ))}
    </ul>
  );
}

// ////////////////////////////////////////////////////

function Friend({ friendObj }) {
  return (
    <li>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>

      {friendObj.balance < 0 && (
        <p className="red">
          You owe {friendObj.name} ${Math.abs(friendObj.balance)}
        </p>
      )}
      {friendObj.balance > 0 && (
        <p className="green">
          {friendObj.name} owes you ${Math.abs(friendObj.balance)}
        </p>
      )}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

// //////////////////////////////////////////////////////////

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48?u');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, id, balance: 0 };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48?u');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🙋‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>👫 X's expense </label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
