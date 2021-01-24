import React, { useState, useEffect } from 'react';
import { Alert, Container, Image, Row, Col, Jumbotron } from 'react-bootstrap';
import { Member } from '../model/member';
import { fetchAllMembers } from '../api';

interface FlashMessageType {
  message: string,
  variant: 'info' | 'danger'
}

interface AboutUsProps {
  useStaging?: boolean
}

export const AboutUs = (props: AboutUsProps) => {

  const [flashMessage, setFlashMessage] = useState<FlashMessageType>();
  const [members, setMembers] = useState<Member[]>();

  useEffect(() => {
    const getAllMembers = async () => {
      const response = await fetchAllMembers(props.useStaging);
      const membersResponse: Member[] = [];
      if (response.objects) {
        for (let responseObject of response.objects) {
          membersResponse.push({
            slug: responseObject.slug,
            title: responseObject.title,
            thumbnail: responseObject.thumbnail,
            content: responseObject.content
          });
        }
        setMembers(membersResponse);
      } else {
        setFlashMessage({
          message: "Error occured while fetching members",
          variant: "danger"
        });
      }
    }
    getAllMembers();
  }, []);

  return (
    <div className="page-layout">
      {
        flashMessage ?
        <Alert variant={flashMessage.variant}>
          {flashMessage.message}
        </Alert> : ''
      }
      <Container>
        {members?.map((member, idx) => (
          <div>
            <Row key={idx}>
              <Col >
                <Image className="member-thumbnail" src={member.thumbnail} roundedCircle />
              </Col>
              <Col className="member-detail" xl={8}>
                <h1>{member.title}</h1>
                <br/>
                <div dangerouslySetInnerHTML={{__html: member.content === undefined ? "": member.content}} />
              </Col>
            </Row>
            <hr/>
          </div>
        ))
        }
      </Container>
    </div>
  );
}
