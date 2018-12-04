FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["ContactHopper.API/ContactHopper.API.csproj", "ContactHopper.API/"]
RUN dotnet restore "Pi.API/Pi.API.csproj"
COPY . .
WORKDIR "/src/ContactHopper.API"
RUN dotnet build "ContactHopper.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "ContactHopper.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "ContactHopper.API.dll"]
