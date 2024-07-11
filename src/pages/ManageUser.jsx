import { jsonAxios } from '../api';
import { useEffect } from 'react';

function ManageUser() {
  useEffect(() => {
    jsonAxios
      .get('/api/v1/admin/users')
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>FULLNAME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default ManageUser;
