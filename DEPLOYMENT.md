# Vercel Deployment Guide

This guide will help you deploy your YT Tourism Backend API to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **MongoDB Atlas**: Set up a MongoDB Atlas cluster

## Step 1: Prepare Your Repository

Make sure all files are committed and pushed to GitHub:

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? (Choose your account)
   - Link to existing project? `N`
   - Project name: `yt-tourism-backend`
   - Directory: `./`
   - Override settings? `N`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `./`
   - Install Command: `npm install`

## Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SECRET_KEY=YATRA_FEEDBACK
NODE_ENV=production
```

## Step 4: Test Your Deployment

After deployment, test your API:

1. **Health Check**: `GET https://your-project.vercel.app/`
2. **Create Feedback**: `POST https://your-project.vercel.app/api/feedback`
3. **Get Feedback**: `GET https://your-project.vercel.app/api/feedback`

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "server.js": {
      "maxDuration": 30
    }
  }
}
```

### package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build step required'"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Environment Variables**: Ensure all required env vars are set in Vercel
3. **Database Connection**: Verify MongoDB URI is correct
4. **CORS Issues**: Check CORS configuration in your app

### Debug Commands:

```bash
# Check Vercel logs
vercel logs

# Check deployment status
vercel ls

# Redeploy
vercel --prod
```

## Monitoring

- **Vercel Analytics**: Monitor performance and usage
- **Function Logs**: Check serverless function logs
- **Database Monitoring**: Monitor MongoDB Atlas metrics

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Configure appropriate CORS origins
3. **Rate Limiting**: Consider implementing rate limiting
4. **Input Validation**: Ensure all inputs are validated

## Performance Optimization

1. **Database Indexing**: Add indexes for frequently queried fields
2. **Connection Pooling**: Optimize MongoDB connections
3. **Caching**: Implement caching for frequently accessed data
4. **Compression**: Enable gzip compression

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Node.js on Vercel**: [vercel.com/docs/functions/serverless-functions/runtimes/node-js](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
