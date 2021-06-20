package borman.aroundthehorn.dao.rowmappers;

import borman.aroundthehorn.models.Room;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class RoomRowMapper implements RowMapper<Room> {

    @Override
    public Room mapRow(ResultSet rs, int rowNum) throws SQLException {
        Room room = new Room();

        room.setRoomId(rs.getString("room_id"));
        room.setRoomName(rs.getString("room_name"));
        room.setCreatedBy(rs.getString("created_by"));

        Timestamp timestamp = rs.getTimestamp("created_date");

        LocalDateTime createdTimestamp = timestamp.toLocalDateTime();

        room.setCreatedTimestamp(createdTimestamp);

        return room;
    }

}