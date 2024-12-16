"use client";

import { use } from "react";
import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper";
import Image from "next/image";

export function Modalorder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    finishOrder(order[0].order.id);
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack}>
          <X onClick={onRequestClose} size={40} color="#ff3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <div className={styles.containerClient}>
            <span className={styles.table}>Mesa: {order[0].order.table}</span>

            {order[0].order?.name && (
              <span className={styles.client}>{order[0].order.name}</span>
            )}
          </div>

          {order.map((item) => (
            <section key={item.id} className={styles.containerItem}>
              <Image
                src={item.product.banner}
                alt="Imagem do produto"
                width={80}
                height={80}
                className={styles.banner}
              />
              <div className={styles.containerInfo}>
                <span>
                  <b>Qtd: {item.amount}</b>
                </span>
                <span>
                  Preço: {parseFloat(item.product.price) * item.amount}
                </span>
                <span>
                  <b>{item.product.name}</b>
                </span>
                <span>{item.product.description}</span>
              </div>
            </section>
          ))}

          <h3 className={styles.total}>
            Valor total: R$ {calculateTotalOrder(order).toFixed(2)}
          </h3>

          <button className={styles.buttonOrder} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
