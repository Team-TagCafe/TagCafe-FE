

import { useEffect, useState } from 'react';

const AdminDeleteCafe = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetch('/cafes/admin/delete-cafe')
      .then(res => res.json())
      .then(data => setCafes(data));
  }, []);

  const handleDelete = (cafeId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    fetch(`/cafes/admin/delete-cafe/${cafeId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          alert('삭제 완료');
          setCafes(prev => prev.filter(c => c.cafeId !== cafeId));
        } else {
          alert('삭제 실패');
        }
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>관리자 - 카페 삭제</h2>
      {cafes.length === 0 ? (
        <p>등록된 카페가 없습니다.</p>
      ) : (
        cafes.map(cafe => (
          <div key={cafe.cafeId} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <p><strong>{cafe.cafeName}</strong> ({cafe.address})</p>
            <button onClick={() => handleDelete(cafe.cafeId)}>삭제</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDeleteCafe;