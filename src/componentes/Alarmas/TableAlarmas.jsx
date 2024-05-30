
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAlarmas } from '../../hooks/useAlarmas';
import { formatDateToYYYYMMDD } from '../../utils/formatear.Date';
import { deleteNoti } from '../../api/auth';

export function TableAlarmas({alarmas, deleteAlarma}){
    
    const { getApellidoCaso } = useAlarmas()
    return (
        <TableContainer component={Paper} className=''>
          <Table padding='normal' sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell ><span className='text-lg text-red-400 font-bold'>Descripción</span></TableCell>
                <TableCell align="left"><span className='text-lg text-red-400 font-bold'>Apellido Caso</span></TableCell>
                <TableCell align="left"><span className='text-lg text-red-400 font-bold'>Fecha</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alarmas.map((alarm) => (
                <TableRow
                  key={alarm._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {alarm.mensaje}
                  </TableCell>
                  <TableCell align="left">{getApellidoCaso(alarm._id)}</TableCell>
                  <TableCell align="left">{formatDateToYYYYMMDD(alarm.vencimiento)}</TableCell>
                  <TableCell>
                    <svg onClick={async () => {
                      const data = await deleteNoti(alarm._id);
                      if(data.data.ok){
                        deleteAlarma(alarm._id);
                        
                      }
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}