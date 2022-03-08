import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ReactReader } from "react-reader"

import { useState, useRef } from "react"

export default function ReadBook() {

  const [page, setPage] = useState('')
  const renditionRef = useRef(null)
  const tocRef = useRef(null)
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start
      const chapter = tocRef.current.find((item) => item.href === href)
      setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
    }
  }

  return (
    <Container fluid className="pb-5">
      <Row className="py-2">
        <Col className="d-flex justify-content-start">
          <Link to="/home" className="d-flex justify-content-center mb-3">
            <img src="/assets/icons/slooping-wow.png" alt="logo" style={{width: "94px"}}/>
          </Link>
        </Col>
      </Row>
      <Row style={{ height: "100vh" }}>
        <ReactReader
          showToc={false}
          locationChanged={locationChanged}
          url="/assets/epub/lewis-prince-caspian.epub"
          getRendition={(rendition) => renditionRef.current = rendition}
          tocChanged={toc => tocRef.current = toc}
        />
        <div style={{ position: 'absolute', top: "120px", right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
        {page}
        </div>
      </Row>
    </Container>
  )
}