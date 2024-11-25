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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add fiend</Button>
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friendObj={friend} key={friend.id} />
      ))}
    </ul>
  );
}

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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend({}) {
  return (
    <form className="form-add-friend">
      <label>🙋‍♂️ Friend name</label>
      <input type="text" />

      <label>🖼Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}
