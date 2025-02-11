"use client";
import styles from '../../styles/Order.module.css'
import Image from 'next/image'

const Order = () => {
    const STATUS = 0;
    
    const statusClass = (index) => {
        if (index - STATUS < 1) return styles.done;
        if (index - STATUS === 1) return styles.inProgress;
        return styles.undone;
    };

    return (
        <div className={styles.container}>
            {/* Left Section - Order Details */}
            <div className={styles.left}>
                <div className={styles.row}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.tr}>
                                <td>
                                    <span className={styles.id}>12145645</span>
                                </td>
                                <td>
                                    <span className={styles.name}>Leonardo A Moura</span>
                                </td>
                                <td>
                                    <span className={styles.address}>R St Avenue Jones 152</span>
                                </td>
                                <td>
                                    <span className={styles.total}>$39.80</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Order Status */}
                <div className={styles.row}>
                    {[
                        { img: "/img/paid.png", label: "Payment" },
                        { img: "/img/bake.png", label: "Preparing" },
                        { img: "/img/bike.png", label: "On the way" },
                        { img: "/img/delivered.png", label: "Delivery" }
                    ].map((step, index) => (
                        <div key={index} className={statusClass(index)}>
                            <Image src={step.img} alt={step.label} width={30} height={30} />
                            <span>{step.label}</span>
                            <div className={styles.checkedIcon}>
                                <Image className={styles.checkedIcon} src="/img/checked.png" alt="Checked" width={20} height={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section - Cart Summary */}
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Cart Total</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b> $79.60
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b> $0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b> $79.60
                    </div>
                    <button disabled className={styles.button}>Paid!</button>
                </div>
            </div>
        </div>
    );
};

export default Order;
