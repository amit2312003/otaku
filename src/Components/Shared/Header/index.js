import { useEffect, useState } from "react"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import { LinkContainer } from "react-router-bootstrap"
import { debounce } from "../../../Utilities/debounce"
import TextField from "@mui/material/TextField"
import { BsSearch } from "react-icons/bs"
import "./header.css"

function Header() {
	const [input, setInput] = useState("")
	const [submit, setSubmit] = useState("")
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)

	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 70) ||
				currentScrollPos < 70
		)

		setPrevScrollPos(currentScrollPos)
	}, 100)

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		alert("you have searched for - " + input)
	}
	const handleKeypress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			handleSubmit()
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [prevScrollPos, visible, handleScroll])

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="dark"
				variant="dark"
				fixed="top"
				className={visible ? "" : "fixed-top-hide"}
			>
				<Container>
					<Navbar.Brand as={Link} to="/">
						Mirai
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/anime">
								<div className="anime-nav">Anime</div>
							</Nav.Link>
							<NavDropdown title="Thể loại" id="collasible-nav-dropdown">
								{GENRES.map((genre) => (
									<LinkContainer to={`/anime/${genre.slug}`} key={genre.slug}>
										<NavDropdown.Item>{genre.name}</NavDropdown.Item>
									</LinkContainer>
								))}
							</NavDropdown>
							<form style={{ display: "flex" }}>
								<TextField
									label="Tìm kiếm"
									variant="outlined"
									className="search-navbar"
									color="primary"
									onChange={handleChange}
									onKeyPress={handleKeypress}
									value={input}
								/>
								<button
									onClick={handleSubmit}
									type="submit"
									style={{
										backgroundColor: "var(--bs-dark-rgb)",
										border: "0",
										margin: "0",
										marginLeft: "10px",
									}}
									className="submit-button"
								>
									<BsSearch className="search-icon" />
								</button>
							</form>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
