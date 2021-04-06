import React from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'
import {Button,Modal, Table, Card, Form} from 'react-bootstrap'
 

class Jurusan extends React.Component {
    constructor() {  
        super();  
        this.state = {  
          token:"",
            jurusan: [],
            id_jurusan:"",
            nama_jurusan:"",
            kepanjangan:"",
            search:"",
            action:"",
          isModalOpen: false
        }
        if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token")
      } else {
          window.location = "/login"
      }

      this.headerConfig.bind(this)
}
headerConfig = () => {
  let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
  }
  return header
}

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleAdd = () => {
        this.setState({
                    id_jurusan: "",
                    nama_jurusan: "",
                    kepanjangan: "",
                    action: "insert",
                    isModalOpen: true
        })
    }
    handleEdit = (item) => {
        this.setState({
                    id_jurusan: item.id_jurusan,
                    nama_jurusan: item.nama_jurusan,
                    kepanjangan: item.kepanjangan,
                    action: "update",
                    isModalOpen: true
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleSave = (event) => {
        event.preventDefault();
        /* menampung data nid, nama dan alamat dari Form
        ke dalam FormData() untuk dikirim  */
        let url = "";
        if (this.state.action === "insert") {
          url = "http://localhost:2000/jurusan/save"
        } else {
          url = "http://localhost:2000/jurusan/update"
        }
        let form = {
            id_jurusan: this.state.id_jurusan,
            nama_jurusan: this.state.nama_jurusan,
            kepanjangan: this.state.kepanjangan
          }
          // mengirim data ke API untuk disimpan pada database
          axios.post(url, form, this.headerConfig())
          .then(response => {
          // jika proses simpan berhasil, memanggil data yang terbaru
          this.getJurusan();
          })
          this.setState({
            isModalOpen: false
        })
        }
    getJurusan = () => {
        let url = "http://localhost:2000/jurusan";
        // mengakses api untuk mengambil data pegawai
        axios.get(url, this.headerConfig())
        .then(response => {
          // mengisikan data dari respon API ke array pegawai
          this.setState({jurusan: response.data.jurusan});
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount(){
        // method yang pertama kali dipanggil pada saat load page
        this.getJurusan()
    }
    findJurusan = (event) => {
        let url = "http://localhost:2000/jurusan";
        if (event.keyCode === 13) {
        //   menampung data keyword pencarian
          let form = {
            find: this.state.search
          }
          // mengakses api untuk mengambil data pegawai
          // berdasarkan keyword
          axios.post(url, form, this.headerConfig())
          .then(response => {
            // mengisikan data dari respon API ke array pegawai
            this.setState({jurusan: response.data.jurusan});
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    Drop = (id_jurusan) => {
        let url = "http://localhost:2000/jurusan/" + id_jurusan;
        // memanggil url API untuk menghapus data pada database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url, this.headerConfig())
          .then(response => {
            // jika proses hapus data berhasil, memanggil data yang terbaru
            this.getJurusan();
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    render(){
        console.log(this.state.jurusan)
        return(
            <>
            <NavBar />
            <Card>
                <Card.Header className="card-header bg-info text-white" align={'center'}>Data Jurusan</Card.Header>
                <Card.Body>
                <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findJurusan} placeholder="Pencarian..." />
                <Button variant="success" onClick={this.handleAdd}>
                    Tambah Data
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>  
                            <th>Nama</th>  
                            <th>Kepanjangan</th>  
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.jurusan.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_jurusan}</td>  
                            <td>{item.nama_jurusan}</td>  
                            <td>{item.kepanjangan}</td>  
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_jurusan)}>  
                                Hapus  
                            </Button>  
                            </td>  
                        </tr>  
                        );  
                    })}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>

                
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Form Jurusan</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                    <Modal.Body>
        
                        ID  
                        <input type="number" name="id_jurusan" value={this.state.id_jurusan} onChange={this.bind}  
                        className="form-control" required />  
                        Nama  
                        <input type="text" name="nama_jurusan" value={this.state.nama_jurusan} onChange={this.bind}  
                        className="form-control" required />  
                        Kepanjangan  
                        <input type="text" name="kepanjangan" value={this.state.kepanjangan} onChange={this.bind}  
                        className="form-control" required />  
                        
                    </Modal.Body>
                     <Modal.Footer>
                     <button className="btn-primary btn-sm" type="submit">  
                     Simpan 
                     </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
    );  
  }
}


export default Jurusan