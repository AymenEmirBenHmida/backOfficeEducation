import { Card, CardContent, Grid } from "@mui/material";
const LogingPage: React.FC = ({}) => {
  return (
    <>
      <div className=" h-full w-full absolute flex items-center justify-center">
        <div className="max-w-[900px] w-full">
          <Card className="p-[2em]" variant="outlined">
            <CardContent>
              <Grid
                container
                spacing={2}
                className="flex justify-center items-center"
              >
                <div className="">Empty</div>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default LogingPage;
