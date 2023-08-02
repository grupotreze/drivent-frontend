import { Price, TicketTypeItem, Type } from './styles.js';

export default function TicketType({ ticket, price, selectedTicket, setSelectedTicket, id, currentTicket }) {
  return (
    <TicketTypeItem onClick={() => setSelectedTicket(currentTicket)} selected={currentTicket.id===selectedTicket?.id}>
      <Type>{ticket}</Type>
      <Price>{`R$ ${parseInt(price/100)}`}</Price>
    </TicketTypeItem>
  );
}
