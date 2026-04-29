export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#071226,#0b1f3a,#09111d)',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#facc15'
              }}
            >
              FocusFlow
            </h1>

            <p style={{ color: '#bfdbfe' }}>
              Superman Theme Productivity App ⚡
            </p>
          </div>

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg,#dc2626,#facc15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            S
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '30px',
            marginBottom: '30px'
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Daily Tasks</h2>

          <div style={{ marginBottom: '15px' }}>
            <input type="checkbox" /> Complete Project Update
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input type="checkbox" /> Edit Instagram Reel
          </div>

          <div>
            <input type="checkbox" /> Workout & Water Tracking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '30px',
            borderRadius: '30px'
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Notes</h2>

          <textarea
            placeholder="Write your notes..."
            style={{
              width: '100%',
              height: '150px',
              borderRadius: '20px',
              padding: '20px',
              border: 'none'
            }}
          />
        </div>
      </div>
    </main>
  )
}
