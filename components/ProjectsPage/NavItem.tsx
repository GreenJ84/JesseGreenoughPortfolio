import React, { useEffect, useState } from 'react'

import { ProjectNavProps } from './ProjectNavbar'

import { Category } from '../../Utils/data/ProjectData'
const css = require('./NavItem.module.css')

interface navItemProps extends ProjectNavProps{
    value: Category | "all"
}

const NavItem = (props: navItemProps) => {
    const [isActive, setIsActive] = useState(false)
    const display = props.value.charAt(0).toUpperCase() + props.value.slice(1);
    
    useEffect(() => {
        if (props.active === props.value) {
            setIsActive(true)
        }
        else { setIsActive(false) }
    }, [props.active, props.value])

    return (
        <li className={ isActive ? css.activeNav : css.navItem } onClick={() => props.filterHandler(props.value)}>
            { display != 'Js' ? display: display.toUpperCase() }
        </li>
    )
}

export default NavItem