import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Link,
  Button,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const Support: React.FC = () => {
  const { t } = useTranslation(['common', 'support']);

  const faqItems = [
    {
      question: t('support:faq.pos.question'),
      answer: t('support:faq.pos.answer'),
    },
    {
      question: t('support:faq.inventory.question'),
      answer: t('support:faq.inventory.answer'),
    },
    {
      question: t('support:faq.reports.question'),
      answer: t('support:faq.reports.answer'),
    },
    {
      question: t('support:faq.customers.question'),
      answer: t('support:faq.customers.answer'),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('support:title')}
      </Typography>

      <Grid container spacing={4}>
        {/* Quick Help Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <HelpOutlineIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{t('support:quickHelp.title')}</Typography>
              </Box>
              <Typography paragraph>
                {t('support:quickHelp.description')}
              </Typography>
              <Button variant="contained" color="primary">
                {t('support:quickHelp.viewGuide')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Support Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ContactSupportIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{t('support:contact.title')}</Typography>
              </Box>
              <Typography paragraph>
                {t('support:contact.description')}
              </Typography>
              <Box>
                <Typography>
                  {t('support:contact.email')}: support@example.com
                </Typography>
                <Typography>
                  {t('support:contact.phone')}: +94 11 234 5678
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentation Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LibraryBooksIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{t('support:documentation.title')}</Typography>
              </Box>
              <Typography paragraph>
                {t('support:documentation.description')}
              </Typography>
              <Link href="#" underline="none">
                <Button variant="outlined" color="primary">
                  {t('support:documentation.viewDocs')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Video Tutorials Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LiveHelpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">{t('support:tutorials.title')}</Typography>
              </Box>
              <Typography paragraph>
                {t('support:tutorials.description')}
              </Typography>
              <Link href="#" underline="none">
                <Button variant="outlined" color="primary">
                  {t('support:tutorials.watchVideos')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* FAQ Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            {t('support:faq.title')}
          </Typography>
          {faqItems.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Support; 