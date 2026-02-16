import "./member.css";

const centerMember = {
  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  name: "Omar",
  role: "Core Member",
};

const members = [
  { img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", name: "Sarah" },
  { img: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7", name: "Lina" },
  { img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", name: "James" },
  { img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12", name: "Nour" },
  { img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde", name: "Adam" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", name: "Eva" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", name: "Mia" },
  { img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91", name: "Mark" },
];

export default function MembersPage() {
  return (
    <div className="members-page">

      <header className="page-header">
        <h2>MEMBERS OF BLUES</h2>
        <p>People who share the same taste</p>
      </header>

      {/* MEMBERS CANVAS */}
      <section className="members-canvas">

        {/* CENTER */}
        <div className="center-card">
          <img src={centerMember.img} />
          <h4>{centerMember.name}</h4>
          <span>{centerMember.role}</span>
        </div>

        {/* AROUND */}
        {members.map((m, i) => (
          <div key={i} className={`around-card pos-${i}`}>
            <img src={m.img} />
            <p>{m.name}</p>
          </div>
        ))}

      </section>

    </div>
  );
}
