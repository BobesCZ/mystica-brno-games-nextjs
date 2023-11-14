import { Box, Container, Divider, Grid, Stack, Typography, darken } from '@mui/material';
import { FooterLink } from './components';
import { useTranslations } from 'next-intl';
import { Urls } from '@/config';
import { GameListInfo } from '@/types';

type Props = {
  gameListInfo?: GameListInfo;
};

export const AppFooter = ({ gameListInfo }: Props) => {
  const t = useTranslations();
  const gamesCount = gameListInfo?.gamesCount;
  const recordCreated = gameListInfo?.recordCreated;

  return (
    <Box sx={{ backgroundColor: '#292112' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
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

      {(gamesCount || recordCreated) && (
        <>
          <Divider
            sx={({ palette }) => ({
              '&.MuiDivider-root': { borderColor: darken(palette.primary.contrastText, 0.5) },
            })}
          />

          <Typography variant="body2" color="secondary.dark" textAlign="center" my={2}>
            {gamesCount && t('footer.gamesCount', { gamesCount })}
            {recordCreated &&
              ' ' + t('footer.recordCreated', { recordCreated: new Date(recordCreated ?? 0).toLocaleDateString() })}
          </Typography>
        </>
      )}
    </Box>
  );
};
