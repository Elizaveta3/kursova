import React from "react";
import Button from "../components/Button/Button";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import { Link, useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  const handleGoToAuthPage = () => {
    navigate("/auth");
  };
  const handleGoToRegisterPage = () => {
    navigate("/register");
  };
  return (
    <body className="page_main">
      <HeaderMain />
      <main className="main">
        <div className="sections-wrapper">
          <section className="first">
            <p className="little_text">
              Відстежуй своє споживання калорій та витрати енергії
            </p>
            <p className="main_text">Почувайся вільно з CaloCheck</p>
            <Button
              buttonClass="button_main"
              handleClick={handleGoToRegisterPage}
            >
              Детальніше
            </Button>
          </section>
          <section className="second">
            <p className="main_text">
              користувачів вже харчуються{" "}
              <span style={{ fontWeight: 700, textDecoration: "underline" }}>
                правильно!
              </span>
            </p>
            <p className="little_text">
              Що <span style={{ fontWeight: 700 }}>заважає</span> тобі?
            </p>
          </section>
          <section className="third">
            <p className="main_text">Що таке <span style={{ fontWeight: 700 }}>калорії</span>?</p>
            <p className="little_text">
              <span style={{ fontWeight: 700 }}>Калорії</span> - це одиниця виміру енергії, яка використовується для
              визначення кількості енергії, яку отримуємо з їжі та
              використовуємо для підтримки життєвих процесів організму.{" "}
            </p>
            <p className="little_text" style={{ marginTop: 60 }} >
              Калорії важливі для <span style={{ fontWeight: 700 }}>забезпечення енергії</span>, необхідної для роботи
              органів, виконання фізичних вправ та інших повсякденних
              активностей.
            </p>
          </section>

          <section className="fourth">
            <p className="main_text">Чому важливо рахувати <span style={{ fontWeight: 700 }} >калорії</span>?</p>
            <p className="little_text" >
              Рахування калорій важливо з кількох причин. 
            </p>
            <p className="little_text" style={{ marginTop: 60 }}>
            <span style={{ fontWeight: 700, textDecoration: "underline"}} >ПО-ПЕРШЕ</span>, це допомагає
              контролювати вагу та зберігати здоровий рівень фізичної форми.
              Збалансована кількість калорій відповідає потребам організму,
              дозволяючи уникнути надмірної ваги або недостатнього харчування.
            </p>
            <p className="little_text" style={{ marginTop: 60 }}>
            <span style={{ fontWeight: 700, textDecoration: "underline"}} >ПО-ДРУГЕ</span>, контроль калорій може сприяти здоровому способу життя та
              запобіганню хворобам. Надмірне споживання калорій може призводити
              до розвитку ожиріння, діабету, серцево-судинних захворювань та
              інших проблем зі здоров'ям.
            </p>
          </section>
          <section className="fifth">
            <p className="main_text">Готові <span style={{ fontWeight: 700}} >почати</span>?</p>
            <div style={{ display: "flex", flexDirection: "column"  }}>
            <Button
              buttonClass="button_main_fifth_register"
              handleClick={handleGoToRegisterPage}
            >
              Зареєструватися
            </Button>
            <Button buttonClass="button_main_fifth_auth" handleClick={handleGoToAuthPage}>
              Увійти
            </Button>
            </div>  
          </section>
        </div>
      </main>
    </body>
  );
};
