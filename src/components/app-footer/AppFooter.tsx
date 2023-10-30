import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { FooterLink } from './components';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';

export const AppFooter = () => {
  const t = useTranslations();

  return (
    <Box sx={{ backgroundColor: '#292112', py: 5 }}>
      <Container maxWidth="md">
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Box mb={2.5}>
            <Typography variant="h3" color="secondary.dark">
              {t('meta.title')}
            </Typography>
          </Box>

          <Grid container columnSpacing={3}>
            <Grid item lg={6}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
                <FooterLink to={Urls.NAME} i18nKey="name.pageTitle" />
                <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
              </Stack>
            </Grid>
            <Grid item lg={6}>
              <Stack alignItems="flex-start" gap={1}>
                <FooterLink to={Urls.FAQ} i18nKey="faq.pageTitle" />
                <FooterLink to={Urls.EXTERNAL_MYSTICA} i18nKey="footer.goToMystica" external />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Stack alignItems="center" sx={{ display: { lg: 'none' } }}>
          <Stack alignItems="flex-start" gap={1.5}>
            <Box mb={1}>
              <Typography variant="h3" color="secondary.dark">
                {t('meta.title')}
              </Typography>
            </Box>

            <FooterLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
            <FooterLink to={Urls.NAME} i18nKey="name.pageTitle" />
            <FooterLink to={Urls.RANK} i18nKey="rank.pageTitle" />
            <FooterLink to={Urls.FAQ} i18nKey="faq.pageTitle" />
            <FooterLink to={Urls.EXTERNAL_MYSTICA} i18nKey="footer.goToMystica" external />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
