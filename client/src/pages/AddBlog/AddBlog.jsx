import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CSSTransition } from "react-transition-group";
import EditorServices from "../../services/EditorServices";
import {
  EditorFormInput,
  Button,
  FileInput,
  ScrollIndicator,
  SnackBar,
  Review,
  ConditionalSimpleBar,
} from "../../components";
import { useCurrentWidth } from "../../hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editorValidationSchema } from "../../validation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryPicker from "./CategoryPicker";
import AddIllustration from "../../assets/img/add.svg";
import EditorIllustration from "../../assets/img/writer.svg";
import "./AddBlog.scss";
import "./Keyframes.scss";
import "./custom.css";
import {
  TitleRounded,
  SubtitlesRounded,
  CloseRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import fromRight from "../../animations/fromRight";

import isEmpty from "is-empty";
import waveImg from "../../assets/img/japan-wave.jpg";
import axios from "axios";

const AddBlog = () => {
  const { theme } = useContext(ThemeContext);
  const [currentWidth, currentHeight] = useCurrentWidth();
  const [activeMenu, setActiveMenu] = useState("general");
  const [coverURL, setCoverURL] = useState(null);
  const [contentError, setContentError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const general = useRef(null);
  const uploadMenu = useRef(null);
  const content = useRef(null);
  const review = useRef(null);

  const textEditor = useRef(null);

  const history = useHistory();

  const {
    register,
    errors,
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(editorValidationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    coverImage: null,
    content: "",
  });

  const getImagePath = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => setCoverURL(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    register("content");
  }, []);

  const onSubmit = async ({
    title,
    subtitle,
    category,
    coverImage,
    content,
  }) => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("category", category);
    formData.append("coverImage", coverImage[0]);
    formData.append("content", content);

    EditorServices.addBlog(formData)
      .then((res) => {
        const { msgError } = res.data.errors;
        if (msgError) setUploadError(true);
        else history.push("/editor");
      })
      .catch(() => setUploadError(true));
  };

  return (
    <ConditionalSimpleBar>
      <motion.div
        className={`add-blog ${theme}`}
        variants={fromRight}
        initial="initial"
        animate="visible"
        exit="exit"
        onAnimationStart={() => (document.body.style.overflow = "hidden")}
        onAnimationComplete={() => (document.body.style.overflow = "auto")}
        style={{ willChange: "transform" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CSSTransition
            in={activeMenu === "general"}
            timeout={500}
            classNames="form-menu"
          >
            <main className="general" ref={general}>
              <div className="content">
                <div className="content-main">
                  <div className="indicator">
                    <Link to="/editor" className="close">
                      <CloseRounded />
                    </Link>
                    <p>
                      Yazı Oluşturun <span>(Adım 1/4)</span>
                    </p>
                  </div>
                  {currentWidth < 450 && currentHeight > 650 ? (
                    <img src={AddIllustration} alt="CONSOLE" />
                  ) : null}
                  <section>
                    <h1>Yazının genel bilgilerini dolduralım</h1>
                    <div className="inputs">
                      <EditorFormInput
                        name="title"
                        theme={theme}
                        register={register}
                        errors={errors}
                        leftIcon={<TitleRounded />}
                        autoComplete="off"
                        defaultValue={formData.title}
                      />
                      <EditorFormInput
                        name="subtitle"
                        register={register}
                        theme={theme}
                        errors={errors}
                        leftIcon={<SubtitlesRounded />}
                        autoComplete="off"
                        defaultValue={formData.subtitle}
                      />
                      <CategoryPicker
                        theme={theme}
                        register={register}
                        inputName="category"
                        control={control}
                        defaultValue={formData.category}
                      />
                    </div>
                    <Button
                      type="button"
                      rightIcon={<KeyboardArrowRightRounded />}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          title: getValues("title"),
                          subtitle: getValues("subtitle"),
                          category: getValues("category"),
                        });
                        trigger(["title", "subtitle"]);
                        setTimeout(() => {
                          if (isEmpty(errors.title) && isEmpty(errors.subtitle))
                            setActiveMenu("upload-image");
                        }, 0);
                      }}
                    >
                      <p>Sonraki Adım</p>
                    </Button>
                  </section>
                </div>
              </div>
              <div className="stripe">{"CONSOLE".repeat(6)}</div>
              <div className="banner">
                <img src={AddIllustration} alt="CONSOLE" />
              </div>
            </main>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "upload-image"}
            timeout={500}
            classNames="form-menu"
            onEnter={() => {
              uploadMenu.current.style.display = "flex";
            }}
          >
            <main className="upload-image" ref={uploadMenu}>
              <div className="content">
                <div className="content-main">
                  <div className="indicator">
                    <Link to="/editor" className="close">
                      <CloseRounded />
                    </Link>
                    <p>
                      Yazı Oluşturun <span>(Adım 2/4)</span>
                    </p>
                  </div>
                  <section>
                    <h1>Şimdi bir kapak fotoğrafı belirleyelim</h1>
                    <div className="input-wrapper">
                      <FileInput
                        register={register}
                        theme={theme}
                        errors={errors}
                        name="coverImage"
                        defaultValue={formData.coverImage}
                        onInput={(e) => {
                          trigger("coverImage");
                          setFormData({
                            ...formData,
                            coverImage: getValues("coverImage"),
                          });

                          getImagePath(e);
                        }}
                      />
                    </div>
                    <div className="controllers">
                      <Button
                        type="button"
                        onClick={() => {
                          setActiveMenu("general");
                        }}
                        leftIcon={<KeyboardArrowLeftRounded />}
                      >
                        Önceki Adım
                      </Button>

                      <div className="seperator"></div>

                      <Button
                        type="button"
                        onClick={() => {
                          trigger("coverImage");
                          setTimeout(() => {
                            if (
                              isEmpty(errors.coverImage) &&
                              formData.coverImage?.length > 0
                            )
                              setActiveMenu("content");
                          }, 0);
                        }}
                        rightIcon={<KeyboardArrowRightRounded />}
                      >
                        Sonraki Adım
                      </Button>
                    </div>
                  </section>
                </div>
              </div>
              <div
                className="preview"
                style={
                  !errors.coverImage &&
                  !isEmpty(coverURL) &&
                  !isEmpty(formData.coverImage?.length > 0)
                    ? {
                        background: `url(${coverURL}) no-repeat center / cover`,
                      }
                    : {
                        background: `url(${waveImg}) no-repeat center / cover`,
                      }
                }
              ></div>
            </main>
          </CSSTransition>
          <CSSTransition
            in={activeMenu === "content"}
            timeout={250}
            classNames="form-menu"
            onEnter={() => {
              content.current.style.display = "flex";
            }}
          >
            <main className="content" ref={content}>
              <SnackBar
                open={contentError}
                setOpen={setContentError}
                severity="error"
              >
                {errors?.content?.message}
              </SnackBar>
              <div className="content-main">
                <header>
                  <div className="info">
                    <aside>
                      <div className="indicator">
                        <Link to="/editor" className="close">
                          <CloseRounded />
                        </Link>
                        <p>
                          Yazı Oluşturun <span>(Adım 3/4)</span>
                        </p>
                      </div>
                      <h1>Şimdi içeriği oluşturma zamanı!</h1>
                      <ul>
                        <li>
                          Başlığı daha önceden belirlediğin için başlığı tekrar
                          editör içinde yazmana gerek yok.
                        </li>
                        <li>Yazının uzunluğu en az 350 kelime olmalı.</li>
                        <li>
                          Yazını resimler ekleyerek zenginleştirebilirsin.
                        </li>
                        <li>
                          Yazıyı yazarken "<span>H1, H2, P</span>" gibi türleri
                          doğru şekilde kullanmaya dikkat et.
                        </li>
                      </ul>
                      <div className="scroller">
                        <ScrollIndicator
                          onClick={() =>
                            textEditor.current.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                              inline: "nearest",
                            })
                          }
                        />
                      </div>
                    </aside>
                  </div>
                  <div className="stripe">{"CONSOLE".repeat(6)}</div>
                  <div className="banner">
                    <img src={EditorIllustration} alt="CONSOLE" />
                  </div>
                </header>

                <div className="how-to" ref={textEditor}>
                  <p>
                    Yazı yazarken nelere dikkat etmen gerektiğini merak
                    ediyorsan
                    <Link to="/editor/how-to" className="how-to-link">
                      {" "}
                      buraya
                    </Link>{" "}
                    tıkla.
                  </p>
                </div>

                <section>
                  <div className="editor-wrapper">
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(e, editor) =>
                        setValue("content", editor.getData())
                      }
                      onBlur={(e, editor) => {
                        setFormData({ ...formData, content: editor.getData() });
                        trigger("content");
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/services/upload",
                        },
                      }}
                    />
                  </div>

                  <div className="controllers">
                    <Button
                      type="button"
                      onClick={() => {
                        content.current.style.display = "none";
                        setActiveMenu("upload-image");
                      }}
                      leftIcon={<KeyboardArrowLeftRounded />}
                    >
                      Önceki Adım
                    </Button>

                    <div className="seperator"></div>

                    <Button
                      type="button"
                      onClick={() => {
                        trigger("content");
                        setFormData({
                          ...formData,
                          content: getValues("content"),
                        });
                        if (
                          errors?.content?.type === "min" ||
                          !formData.content
                        )
                          setContentError(true);
                        setTimeout(() => {
                          if (isEmpty(errors.content)) {
                            setActiveMenu("review");
                            setTimeout(
                              () =>
                                window.scroll({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                }),
                              0
                            );
                          }
                        }, 0);
                      }}
                      rightIcon={<KeyboardArrowRightRounded />}
                    >
                      Sonraki Adım
                    </Button>
                  </div>
                </section>
              </div>
            </main>
          </CSSTransition>
          <CSSTransition
            in={activeMenu === "review"}
            timeout={250}
            classNames="form-menu"
            onEnter={() => {
              review.current.style.display = "flex";
            }}
          >
            <Review
              uploadError={uploadError}
              setUploadError={setUploadError}
              formData={formData}
              coverURL={coverURL}
              review={review}
              setActiveMenu={setActiveMenu}
            />
          </CSSTransition>
        </form>
      </motion.div>
    </ConditionalSimpleBar>
  );
};

export default AddBlog;
