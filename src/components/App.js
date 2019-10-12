import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import Modal from 'react-modal';
// ACTIONS
import * as nuitAction from '../actions/nuitActions';
// STYLE
import "../sass/main.scss";
// DEFAULT IMAGES
import hotel1 from '../img/hotel-1.jpg';
import hotel2 from '../img/hotel-2.jpg';
import hotel3 from '../img/hotel-3.jpg';
import hotel4 from '../img/hotel-4.jpg';
// Modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    modalIsOpen: false,
    total: 0,
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    modalIsOpenConf: false,
  };
}

UNSAFE_componentWillReceiveProps(nextProps){
  let sum = 0;
  if(this.props.nuits !== nextProps.nuits){
    map(nextProps.nuits, (nuit) =>{
      sum = sum + nuit.hotel.price;
    });
    this.setState({total: sum})
  }
}

openModal = () =>{
  this.setState({modalIsOpen: true});
}

closeModal = () => {
  this.setState({modalIsOpen: false});
}

openModalConf = () =>{
  this.setState({modalIsOpenConf: true});
}

closeModalConf = () =>{
  this.setState({modalIsOpenConf: false,
                  nom:'',
                  prenom: '',
                  email: '',
                  adresse: ''});
  this.props.resetNuit();
}

getImg = (hotel) => {
  let img = null;
  switch (hotel.img) {
    case 'hotel1':
      img = hotel1;
      break;
      case 'hotel2':
        img = hotel2;
        break;
        case 'hotel3':
          img = hotel3;
          break;
          case 'hotel4':
            img = hotel4;
            break;
    default:
      break;
  }
  return img;
}

sendNuit = (hotel) => {
  let nuit = {
    hotel
  }
  this.props.createNuit(nuit);
}

handleChange = (event) => {
  this.setState({[event.target.name]: event.target.value});
}

handleSubmit = (event) => {
  event.preventDefault();
  this.closeModal();
  this.openModalConf();
}

getShowNuits = (nuits) => {
  const {total} = this.state;
return <div>
  {map(nuits, (nuit, i) => (
  <div className="hotel-view-min__item" key={i}>
  <div>
    <img src={this.getImg(nuit.hotel)} alt={nuit.hotel.img} className="hotel-view-min__item_img"/>
  </div>
  <div className="hotel-view-min__item__price">
    <b>{nuit.hotel.price}&euro;</b>
    <br/>
    <span className="hotel-view-min__item__price-sm">prix/nuit</span>
  </div>
</div>
))}
  <div className="hotel-view-min__item__total">
    <span>TOTAL</span> {total}&euro;
  </div>
</div>

}

render() {
  const {hotels, nuits} = this.props;
  const {total} = this.state;
  return (
      <div className="container">
        <div className="head">
          <header className="header">
          <nav className="logo-nav">
              <div className="logo-nav__user">
                <span className="logo-nav__user-name">LOGO</span>
              </div>
            </nav>
            <nav className="user-nav">
              <div className="user-nav__user">
                <div className="user-nav__user-photo" />
                <span className="user-nav__user-name">John Doe</span>
              </div>
            </nav>
          </header>
        </div>
            <div className="content">
                <main className="hotel-view">
                  {/** HOTEL NUITS*/}
                  {map(hotels, (hotel, i) => (
                    <div className="hotel-view__item" key={i} onClick={() => this.sendNuit(hotel)}>
                    <div>
                      <img src={this.getImg(hotel)} alt={hotel.img} className="hotel-view__item_img"/>
                    </div>
                    <div className="hotel-view__item__content">
                      <div className="hotel-view__item__content__title">
                        {hotel.title}
                      </div>
                      <div className="hotel-view__item__content__body">
                        {hotel.body}
                      </div>
                    </div>
                    <div className="hotel-view__item__price">
                      <b>{hotel.price}&euro;</b>
                      <br/>
                      prix/nuit
                    </div>
                  </div>
                  ))}
                </main>
                <nav className="sidebar">
                    <div className="side-nav">
                    <div className="side-nav__item">
                        <b>PANIER</b>
                        </div>
                        {/** NUITS*/}
                        {this.getShowNuits(nuits)}
                        <div className={total>0 ? "" : "calcMe" }>
                        <button className="valider" onClick={this.openModal}>Reserver</button>
                        </div>
                    </div>
                </nav>
            </div>
            {/** MODAL INFO */}
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Informations personnelles"
            >
              <h2 ref={subtitle => this.subtitle = subtitle}>Informations personnelles</h2>
              <br/>
              <form onSubmit={this.handleSubmit}>
                <table>
                <tbody>
                  <tr>
                    <td>Email: </td>
                    <td><input type="email" name="email" required 
                    value={this.state.email} onChange={this.handleChange} /> <span className="obligatoire">(email obligatoire)</span></td>
                  </tr>
                  <tr>
                    <td>Nom: </td>
                    <td><input type="text" name="nom" value={this.state.nom} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Pr&eacute;nom: </td>
                    <td><input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Adresse: </td>
                    <td><textarea name="adresse" value={this.state.adresse} onChange={this.handleChange} /></td>
                  </tr>
                  </tbody>
                </table>
                <input className="valider" type="submit" value="Confirmer" />
                <button className="valider" onClick={this.closeModal}>Annuler</button>
              </form>
              <br/>
            </Modal>
            {/** MODAL CONFIRMATION */}
            <Modal
              isOpen={this.state.modalIsOpenConf}
              onRequestClose={this.closeModalConf}
              style={customStyles}
              contentLabel="recapitulatif de la commande"
            >
              <h2 ref={subtitle => this.subtitle = subtitle}>R&eacute;capitulatif de la commande</h2>
              <br/>
                <b>
                  Merci pour votre confirmation, veuillez trouver ci-joint le r&eacute;capitulatif de votre reservation.
                </b><br/><br/>
                <table>
                <tbody>
                  <tr>
                    <td>Email: </td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Nom: </td>
                    <td>{this.state.nom} </td>
                  </tr>
                  <tr>
                    <td>Pr&eacute;nom: </td>
                    <td>{this.state.prenom}</td>
                  </tr>
                  <tr>
                    <td>Adresse: </td>
                    <td>{this.state.adresse}</td>
                  </tr>
                  </tbody>
                </table>
                <br/>
                <b>Vous avez r&eacute;serv&eacute; :</b>
                <br/>
                {/** NUITS*/}
                {this.getShowNuits(nuits)}
                <br/>
                <center>
                <button className="valider" onClick={this.closeModalConf}>Quitter</button>
                </center>
              <br/>
            </Modal>
        </div>
  );
}
}
const mapStateToProps = (state) => {
  return {
    hotels: state.hotels,
    nuits: state.nuits
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNuit: nuit => dispatch(nuitAction.createNuit(nuit)),
    resetNuit: () => dispatch(nuitAction.resetNuit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);