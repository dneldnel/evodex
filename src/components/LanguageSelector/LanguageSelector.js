import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Language as LanguageIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  languageText: {
    fontSize: 20.2,
    fontWeight: '600',
    letterSpacing: '0.25px',
    marginLeft: 3,
    display: 'none',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  iconLanguage: {
    width: 24,
    height: 24
  }
}))

const LanguageSelector = ({ alt }) => {
  const classes = useStyles()
  const { i18n } = useTranslation('translations')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (item) => {
    setAnchorEl(null)
    if (typeof item === 'string') i18n.changeLanguage(item)
  }

  const languages = [
    {
      value: 'en',
      label: 'English'
    },
    {
      value: 'es',
      label: 'Español'
    },
    {
      value: 'zh',
      label: '中文'
    }
  ]

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClick}>
        <LanguageIcon alt={alt} className={classes.iconLanguage} />
        <Typography variant="h5" className={classes.languageText}>
          {(i18n.language || '').toLocaleUpperCase().substring(0, 2)}
        </Typography>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.length &&
          languages.map((item) => (
            <MenuItem
              key={`language-menu-${item.label}`}
              onClick={() => handleClose(item.value)}
            >
              {`${item.label} - ${(item.value || '').toLocaleUpperCase()}`}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

LanguageSelector.propTypes = {
  alt: PropTypes.string
}

export default LanguageSelector
