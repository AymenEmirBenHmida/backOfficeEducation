import React, { useState } from "react";
import { Select, MenuItem, Box, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import frenchSvg from "/images/Flag_of_France.svg";
import englishSvg from "/images/Flag_of_the_United_Kingdom.svg";
import tunisiaSvg from "/images/Flag_of_Tunisia.svg";

const LanguageChanger: React.FC = () => {
  //used for translation
  const { t } = useTranslation();
  //the languages that we can change between
  const languages = [
    {
      code: "en",
      name: t("txt_english"),
      flag: englishSvg,
    },
    {
      code: "fr",
      name: t("txt_french"),
      flag: frenchSvg,
    },
    {
      code: "ar",
      name: t("txt_arabic"),
      flag: tunisiaSvg,
    },
  ];
  //the first language taht's selected is teh default language sat up in 18n
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  //when we change a language the local storage representing the language
  //and the language used in 18n is changed to it using it's code
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLang = languages.find(
      (lang) => lang.code === event.target.value
    );
    if (selectedLang) {
      i18n.changeLanguage(selectedLang.code);
      setSelectedLanguage(event.target.value);
      localStorage.setItem("language", selectedLang.code);
    }
  };

  return (
    <Select
      value={selectedLanguage}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select language" }}
      variant="outlined"
      sx={{
        color: "black",
        borderColor: "white",
        backgroundColor: "white",
        width: "150px",
      }}
      renderValue={(value) => {
        const selectedLang = languages.find((lang) => lang.code === value);
        return (
          <Box display="flex" alignItems="center">
            {selectedLang && (
              <>
                <img
                  src={selectedLang.flag}
                  alt={`${selectedLang.name} flag`}
                  style={{ width: "24px", marginRight: "8px" }}
                />
                {selectedLang.name}
              </>
            )}
          </Box>
        );
      }}
    >
      {languages.map((language) => (
        <MenuItem
          key={language.code}
          value={language.code}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src={language.flag}
            alt={`${language.name} flag`}
            style={{ width: "24px", marginRight: "5px" }}
          />
          {language.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageChanger;
