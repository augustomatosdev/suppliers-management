import React from "react";

const Message = () => (
  <article className="message">
    <div className="message-header">
      <p>Nota de esclarecimento</p>
    </div>
    <div className="message-body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
      nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
      diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac{" "}
      <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
      sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a
      neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      <br /> <br /> Este aplicativo funciona em qualquer Browser de Internet
      (Internet Explorer, Safari, Google Chrome, Firefox, Opera, etc),
      independentemente do tamanho ou resolução do ecran do computador e ainda
      em Tablets iPad ou Android e em Smart Phones ou iPhones, adequando-se
      automaticamente a cada um deles.
    </div>
  </article>
);
export default Message;
